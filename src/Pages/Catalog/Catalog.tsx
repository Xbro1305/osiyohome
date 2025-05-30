import styles from "./Catalog.module.scss";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Loader } from "../../widgets/Loader/Loader";

export const Catalog = () => {
  const { type } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const baseUrl = import.meta.env.VITE_APP_API_URL;
    const url =
      type == "fabrics"
        ? `${baseUrl}/categories?applies_to=0`
        : `${baseUrl}/categories?applies_to=1`;

    axios(url)
      .then((res) => setData(res.data.innerData))
      .catch((err) => toast.error(err.response.data.msg))
      .finally(() => setLoading(false));
  }, [type]);

  return (
    <div className={styles.catalog}>
      {loading && <Loader />}
      <h1 className={styles.catalog_title}>
        {type == "fabrics" ? "Ткани" : "Комплекты постельного белья"}
      </h1>
      <div className={styles.catalog_items}>
        {data.map((item: any, index) => (
          <Link
            to={`/catalog/category/${item.categoryId}`}
            key={index}
            className={styles.catalog_item}
          >
            <img src={item.preview} alt="" />
            <h2 className={styles.catalog_item_title}>{item.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
};
