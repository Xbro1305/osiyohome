import styles from "./Category.module.scss";
import { data as items } from "../../data";
import { Link, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

export const CatalogCategory = () => {
  const { category } = useParams();
  const categoryItems = items.find(
    (item) => category && item.link.includes(category)
  );

  if (!categoryItems) {
    return <div className={styles.error}>Категория не найдена</div>;
  }

  return (
    <div className={styles.category}>
      <Link to="/catalog">
        <h1 className={styles.category_title}>
          <FaArrowLeft />
          {categoryItems.title}
        </h1>
      </Link>
      <div className={styles.category_items}>
        {categoryItems.items.map((item, index) => (
          <Link to={item.link} key={index} className={styles.category_item}>
            <img src={item.images[0]} alt={`Item ${item.art}`} />
            <h2 className={styles.category_item_title}>Артикул: {item.art}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
};
