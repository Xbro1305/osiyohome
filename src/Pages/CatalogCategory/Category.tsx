import styles from "./Category.module.scss";
import { Link, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Loader } from "../../widgets/Loader/Loader";

export const CatalogCategory = () => {
  const { category } = useParams();
  const [categoryItems, setCategoryItems] = useState<any>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios(`${import.meta.env.VITE_APP_API_URL}/products?categoryId=${category}`)
      .then((res) => setCategoryItems(res.data.innerData))
      .catch((err) => toast.error(err.response.data.msg))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className={styles.category}>
      {loading && <Loader />}
      <button
        type="button"
        className={styles.category_back_button}
        onClick={() => window.history.back()}
        style={{
          background: "none",
          border: "none",
          padding: 0,
          cursor: "pointer",
        }}
      >
        <h1 className={styles.category_title}>
          <FaArrowLeft />
        </h1>
      </button>
      <div className={styles.category_items}>
        {categoryItems?.map((item: any, index: number) => (
          <Link
            to={`/catalog/item/${item.article}`}
            key={index}
            className={styles.category_item}
          >
            <img src={item.img[0]} alt={`Item ${item.article}`} />
            <h2 className={styles.category_item_title}>
              Артикул: {item.article}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
};
