import styles from "./Item.module.scss";
import { data as items } from "../../data";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CgClose } from "react-icons/cg";

export const CatalogItem = () => {
  const [opened, setOpened] = useState<string | false>(false);

  const { art } = useParams();
  const [item, setItem] = useState<{ art: number; images: string[] } | null>(
    null
  );

  useEffect(() => {
    if (art) {
      const foundItem = items
        .flatMap((category) => category.items)
        .find((i) => i.art === parseInt(art));
      setItem(foundItem || null);
    }
  }, [art]);

  if (!item) {
    return <div className={styles.error}>Товар не найден</div>;
  }

  return (
    <div className={styles.item}>
      {opened && (
        <div className={styles.item_opened}>
          <button onClick={() => setOpened(false)}>
            <CgClose />
          </button>
          <img src={opened} alt="" />
        </div>
      )}
      <Link to="/catalog" className={styles.back}>
        <FaArrowLeft /> Назад к каталогу
      </Link>
      <h1 className={styles.item_title}>Артикул: {item.art}</h1>
      <div className={styles.item_images}>
        {item.images.map((image, index) => (
          <img
            onClick={() => setOpened(image)}
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
