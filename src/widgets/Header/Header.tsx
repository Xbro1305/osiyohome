import styles from "./Header.module.scss";
import logo from "../../assets/logo.jpg";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

export const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className={`${styles.header} ${open ? styles.active : ""}`}>
      <Link to={"/"} className={styles.header_logo}>
        <img src={logo} alt="" />
        <p className={styles.header_logo_text}>
          <span>OSIYO</span>
          <span>HOME</span>
        </p>
      </Link>

      <nav className={styles.header_links}>
        <NavLink onClick={() => setOpen(false)} className="header_link" to="/">
          Главная
        </NavLink>
        <NavLink
          onClick={() => setOpen(false)}
          className="header_link"
          to="/about"
        >
          О компании
        </NavLink>
        <NavLink
          onClick={() => setOpen(false)}
          className="header_link"
          to="/catalog"
        >
          Каталог
        </NavLink>
        <NavLink
          onClick={() => setOpen(false)}
          className="header_link"
          to="/contacts"
        >
          Контакты
        </NavLink>
      </nav>

      <button onClick={() => setOpen(!open)} className={styles.header_burger}>
        {open ? (
          <p>&times;</p>
        ) : (
          <>
            <span></span>
            <span></span>
            <span></span>
          </>
        )}
      </button>
    </header>
  );
};
