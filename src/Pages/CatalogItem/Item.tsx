import styles from "./Item.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { CgClose } from "react-icons/cg";
import axios from "axios";
import { toast } from "react-toastify";
import { Loader } from "../../widgets/Loader/Loader";

export const CatalogItem = () => {
  const [opened, setOpened] = useState<string | false>(false);

  const { art } = useParams();
  const [item, setItem] = useState<any | null>(null);
  const [loadin, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios(`${import.meta.env.VITE_APP_API_URL}/products/?article=${art}`)
      .then((res) => setItem(res.data.innerData[0]))
      .catch((err) => toast.error(err.response.data.msg))
      .finally(() => setLoading(false));
  }, [art]);

  if (!item) {
    return (
      <div className={styles.error}>
        Товар не найден
        {loadin && <Loader />}
      </div>
    );
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setOpened(false);

    if (e.key === "ArrowRight" && opened !== false) {
      const nextIndex = (Number(opened) + 1) % item.images.length;
      setOpened(`${nextIndex}`);
    } else if (e.key === "ArrowLeft" && opened !== false) {
      const prevIndex =
        (Number(opened) - 1 + item.images.length) % item.images.length;
      setOpened(`${prevIndex}`);
    }
  });

  return (
    <div className={styles.item}>
      {loadin && <Loader />}

      {opened && (
        <div className={styles.item_opened}>
          <button onClick={() => setOpened(false)}>
            <CgClose />
          </button>
          <img src={item?.img[Number(opened)]} alt="" />
          <section className={styles.item_opened_images}>
            {item.img.map((image: any, index: number) => (
              <img
                onClick={() => setOpened(`${index}`)}
                className={
                  opened != `${index}` ? styles.item_opened_image_inactive : ""
                }
                key={index}
                src={image}
                alt={`Item ${item.article}`}
              />
            ))}
          </section>
        </div>
      )}
      <a onClick={() => navigate(-1)} className={styles.back}>
        <FaArrowLeft /> Назад к каталогу
      </a>
      <h1 className={styles.item_title}>Артикул: {item.article}</h1>
      <div className={styles.item_images}>
        {item?.img?.map((image: any, index: number) => (
          <img
            onClick={() => setOpened(`${index}`)}
            className={styles.item_image}
            key={index}
            src={image}
            alt={`Item ${item.art}`}
          />
        ))}
      </div>
    </div>
  );
};
