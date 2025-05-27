import styles from "./Catalog.module.scss";
import { data as items } from "../../data";
import { Link } from "react-router-dom";

export const Catalog = () => {
  return (
    <div className={styles.catalog}>
      <h1 className={styles.catalog_title}>Каталог</h1>
      <div className={styles.catalog_items}>
        {items.map((item, index) => (
          <Link to={item.link} key={index} className={styles.catalog_item}>
            <img src={item.items[0].images[0]} alt="" />
            <h2 className={styles.catalog_item_title}>{item.title}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
};
