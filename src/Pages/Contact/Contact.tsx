import { BiPhone } from "react-icons/bi";
import { BsInstagram, BsYoutube } from "react-icons/bs";
import { FaTelegramPlane } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import { Link } from "react-router-dom";
import styles from "./Contact.module.scss";
import { useEffect, useState, type FormEvent } from "react";
import { TfiEmail } from "react-icons/tfi";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";

export const Contact = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [theme, setTheme] = useState<string>("");
  const [text, setText] = useState<string>("");

  useEffect(() => {
    emailjs.init("RZZxM8VbiJBQE2jC2");
  }, []);

  const send = (e: FormEvent) => {
    e.preventDefault();

    emailjs
      .send("service_c3rh8z1", "template_qc8vwhj", {
        name,
        email,
        message: text,
        title: theme,
      })
      .then(() => {
        toast.success("Сообщение отправлено");
      })
      .catch(() => {
        alert("Произошла ошибка");
      });
  };

  return (
    <div className={styles.contact}>
      <form onSubmit={(e) => send(e)} className={styles.contact_top}>
        <div className={styles.contact_top_left}>
          <label>
            <p>Ваше имя:</p>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>{" "}
          <label>
            <p>Ваша почта:</p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>{" "}
          <label>
            <p>Тема Вопроса:</p>
            <input
              type="text"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
            />
          </label>
          <input type="submit" value="Отправить" />
        </div>
        <label>
          <p>Сообшение</p>
          <textarea
            name="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            id=""
          ></textarea>
        </label>
      </form>
      <div className={styles.contacts}>
        <div className={styles.contacts_left}>
          <h1 className={styles.title}>Контакты</h1>
          <p>
            <MdLocationPin />
            Наманганская область, город Наманган, Раустан МСГ, улица Дустлик, 7
          </p>
          <section>
            <Link to="tel:+998911783333">
              <BiPhone />
              +998 911783333
            </Link>
            <Link to="tel:+998911801311">
              <BiPhone />
              +998 911801311
            </Link>
          </section>
          <section>
            <span>Мы в социальных сетях:</span>
            <Link to="https://t.me/OsiyoHomeTex1" target="_blank">
              <FaTelegramPlane /> @OsiyoHomeTex1
            </Link>
            <Link to="https://www.instagram.com/osiyo_hometex/" target="_blank">
              <BsInstagram /> @osiyo_hometex
            </Link>
            <Link to="https://youtube.com/@Osiyohome">
              <BsYoutube />
              @Osiyohome
            </Link>
            <Link to="mailto:osiyotex@gmail.com">
              <TfiEmail /> osiyotex@gmail.com
            </Link>
          </section>
          <p>© 2017–{new Date().getFullYear()} OOO "Osiyo Home Textile"</p>
        </div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d6023.930386428343!2d71.606341!3d40.982243!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDDCsDU4JzU2LjEiTiA3McKwMzYnMjIuOCJF!5e0!3m2!1sru!2sus!4v1748340661772!5m2!1sru!2sus"
          width="600"
          height="450"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};
