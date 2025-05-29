import styles from "./Home.module.scss"; // Import Swiper React components
import banner1 from "../../assets/HomeBanners/home-banner1.jpg";
import { Link } from "react-router-dom";
import { FaArrowRight, FaChevronDown, FaTelegramPlane } from "react-icons/fa";
import infoblock1 from "../../assets/infoblock_1.jpg";
import infoblock2 from "../../assets/infoblock_2.jpg";
import { Carousel } from "./Carousel";
import { useEffect, useState } from "react";
import logo from "../../assets/logo.jpg";
import { BsClock, BsInstagram, BsYoutube } from "react-icons/bs";
import { RxCheck } from "react-icons/rx";
import { FiTruck } from "react-icons/fi";
import { MdLocationPin } from "react-icons/md";
import { BiPhone } from "react-icons/bi";
import { TfiEmail } from "react-icons/tfi";
import axios from "axios";
import { Loader } from "../../widgets/Loader/Loader";

export const Home = () => {
  const [news, setNews] = useState([]);
  const [sets, setSets] = useState([]);
  const [load, setLoad] = useState(true);
  useEffect(() => {
    axios(`${import.meta.env.VITE_APP_API_URL}/products?type=0`, {
      data: { length: 10 },
    })
      .then((res) => setNews(res.data.innerData))
      .catch((err) => console.log(err));
    axios(`${import.meta.env.VITE_APP_API_URL}/products?type=1`, {
      data: { length: 10 },
    })
      .then((res) => setSets(res.data.innerData))
      .catch((err) => console.log(err))
      .finally(() => setLoad(false));
  }, []);
  const [adv, setAdv] = useState<0 | 1 | 2 | 3>(1);
  return (
    <div className={styles.home}>
      {load && <Loader />}
      <div className={styles.home_slider}>
        <div className={styles.home_banner}>
          <img src={banner1} alt="" />
          <p>Где начинается утро с комфорта, а ночь — с уюта</p>
        </div>
      </div>
      <div className={styles.home_categories}>
        <h1 className={styles.home_title}>Новинки</h1>

        <div className={styles.home_categories_carousel}>
          <section>
            <h2 className={styles.home_subtitle}>Свежие ткани</h2>
            <Link to="/catalog/fabrics">
              Перейти{" "}
              <span>
                <FaArrowRight />
              </span>
            </Link>
          </section>
          <Carousel items={news} />
        </div>
        <div className={styles.home_categories_carousel}>
          <section>
            <h2 className={styles.home_subtitle}>Свежие комплекты</h2>
            <Link to="/catalog/bedding-sets">
              Перейти{" "}
              <span>
                <FaArrowRight />
              </span>
            </Link>
          </section>
          <Carousel items={sets} />
        </div>
      </div>
      <div className={styles.home_infoBlock}>
        <section>
          <h1 className={styles.home_title}>OSIYO HOME TEX</h1>
          <p className={styles.home_text}>
            Компания OOO «OSIYO HOME ТЕХ» специализируется на выпуске
            хлопчатобумажной ткани для производства постельного белья и
            комплекты. Компания осуществляет свою деятельность в собственных
            производственных помещениях на территории Наманганской области.
            <br />
            На производстве используется широкий спектр современного
            оборудования ведущих производителей мира, что позволяет производить
            большой номенклатурный ряд высококачественной продукции способной
            удовлетворить запросы самого взыскательного заказчика.
          </p>
        </section>
        <figure>
          <img src={infoblock1} alt="" />
          <img src={infoblock2} alt="" />
        </figure>
      </div>
      <div className={styles.home_advantages}>
        <div className={styles.home_advantages_top}>
          <p
            className={styles.home_subtitle}
            style={{ background: adv == 1 ? "var(--gray)" : "" }}
            onClick={() => setAdv(1)}
          >
            О компании
          </p>
          <p
            className={styles.home_subtitle}
            style={{ background: adv == 2 ? "var(--gray)" : "" }}
            onClick={() => setAdv(2)}
          >
            Производство
          </p>
          <p
            className={styles.home_subtitle}
            style={{ background: adv == 3 ? "var(--gray)" : "" }}
            onClick={() => setAdv(3)}
          >
            Преимущества
          </p>
        </div>
        <div className={styles.home_advantages_content}>
          {adv === 1 && (
            <div className={styles.home_advantages_item}>
              <p>
                ООО «OSIYO HOME TEX» — это текстильное предприятие,
                специализирующееся на производстве хлопчатобумажной ткани для
                изготовления постельного белья и текстильных комплектов. <br />
                <br />
                Компания ведёт свою деятельность на территории Наманганской
                области в собственных производственных помещениях, что
                обеспечивает полный контроль над качеством на всех этапах
                выпуска продукции. <br />
                <br /> Мы используем современное оборудование ведущих мировых
                производителей, что позволяет нам выпускать продукцию,
                соответствующую международным стандартам качества и
                удовлетворяющую потребности даже самых требовательных клиентов.
              </p>
              <img src={logo} alt="" />
            </div>
          )}
          {adv === 2 && (
            <div className={styles.home_advantages_item}>
              <p>
                Производственная база предприятия позволяет выпускать до
                <b>12 000 погонных метров ткани в сутки.</b> <br />
                <br />
                <b> 🔧 Основные параметры выпускаемой продукции:</b>
                <ul>
                  <li>Ширина ткани: от 160 см до 240 см </li>
                  <li>Поверхностная плотность: от 100 г/м² до 250 г/м²</li>
                </ul>
                <br />
                Наше оборудование и квалифицированный персонал обеспечивают
                стабильное качество и высокую производительность, благодаря чему
                мы можем выполнять как стандартные, так и индивидуальные заказы
                в короткие сроки.
              </p>
              <img src={infoblock2} alt="" />
            </div>
          )}
          {adv === 3 && (
            <div className={styles.home_advantages_item}>
              <p>
                Мы предлагаем хлопчатобумажные ткани следующих видов:
                <ul>
                  <li>Поплин</li>
                  <li>Ранфорс (Ромфорс)</li>
                  <li>Сатин</li>
                  <li>Страйп-сатин </li>
                  <li>Бязь</li>
                </ul>
                <br /> 🟢 Преимущества нашей продукции:
                <ul>
                  <li> Высокая гигроскопичность — хорошо впитывает влагу</li>
                  <li>
                    Изготовлена из натуральных волокон — не вызывает аллергии
                  </li>
                  <li>
                    Комфортна в использовании в жаркую погоду Мягкая и нежная на
                    ощупь
                  </li>
                  <li>Лёгкий уход — допускает стирку в бытовых условиях</li>
                </ul>
              </p>
              <img src={infoblock1} alt="" />
            </div>
          )}
        </div>
      </div>
      <div className={styles.home_advantages_mob}>
        <div
          style={{ background: "var(--gray)" }}
          onClick={() => setAdv(adv == 1 ? 0 : 1)}
        >
          <p className={styles.home_subtitle}>
            О компании{" "}
            <FaChevronDown
              style={{
                transform: adv == 1 ? "rotate(180deg)" : "",
              }}
            />
          </p>
          {adv === 1 && (
            <div className={styles.home_advantages_mob_item}>
              <p>
                ООО «OSIYO HOME TEX» — это текстильное предприятие,
                специализирующееся на производстве хлопчатобумажной ткани для
                изготовления постельного белья и текстильных комплектов. <br />
                <br />
                Компания ведёт свою деятельность на территории Наманганской
                области в собственных производственных помещениях, что
                обеспечивает полный контроль над качеством на всех этапах
                выпуска продукции. <br />
                <br /> Мы используем современное оборудование ведущих мировых
                производителей, что позволяет нам выпускать продукцию,
                соответствующую международным стандартам качества и
                удовлетворяющую потребности даже самых требовательных клиентов.
              </p>
              <img src={logo} alt="" />
            </div>
          )}
        </div>

        <div
          style={{ background: "var(--gray)" }}
          onClick={() => setAdv(adv == 2 ? 0 : 2)}
        >
          <p
            className={styles.home_subtitle}
            style={{ background: "var(--gray)" }}
            onClick={() => setAdv(adv == 2 ? 0 : 2)}
          >
            Производственные мощности
            <FaChevronDown
              style={{
                transform: adv == 2 ? "rotate(180deg)" : "",
              }}
            />
          </p>
          {adv === 2 && (
            <div className={styles.home_advantages_mob_item}>
              <p>
                Производственная база предприятия позволяет выпускать до
                <b>12 000 погонных метров ткани в сутки.</b> <br />
                <br />
                <b> 🔧 Основные параметры выпускаемой продукции:</b>
                <ul>
                  <li>Ширина ткани: от 160 см до 240 см </li>
                  <li>Поверхностная плотность: от 100 г/м² до 250 г/м²</li>
                </ul>
                <br />
                Наше оборудование и квалифицированный персонал обеспечивают
                стабильное качество и высокую производительность, благодаря чему
                мы можем выполнять как стандартные, так и индивидуальные заказы
                в короткие сроки.
              </p>
              <img src={infoblock2} alt="" />
            </div>
          )}
        </div>

        <div
          style={{ background: "var(--gray)" }}
          onClick={() => setAdv(adv == 3 ? 0 : 3)}
        >
          <p
            className={styles.home_subtitle}
            style={{ background: "var(--gray)" }}
            onClick={() => setAdv(adv == 3 ? 0 : 3)}
          >
            Ассортимент и преимущества тканей
            <FaChevronDown
              style={{
                transform: adv == 3 ? "rotate(180deg)" : "",
              }}
            />
          </p>
          {adv === 3 && (
            <div className={styles.home_advantages_mob_item}>
              <p>
                Мы предлагаем хлопчатобумажные ткани следующих видов:
                <ul>
                  <li>Поплин</li>
                  <li>Ранфорс (Ромфорс)</li>
                  <li>Сатин</li>
                  <li>Страйп-сатин </li>
                  <li>Бязь</li>
                </ul>
                <br /> 🟢 Преимущества нашей продукции:
                <ul>
                  <li> Высокая гигроскопичность — хорошо впитывает влагу</li>
                  <li>
                    Изготовлена из натуральных волокон — не вызывает аллергии
                  </li>
                  <li>
                    Комфортна в использовании в жаркую погоду Мягкая и нежная на
                    ощупь
                  </li>
                  <li>Лёгкий уход — допускает стирку в бытовых условиях</li>
                </ul>
              </p>
              <img src={infoblock1} alt="" />
            </div>
          )}
        </div>
      </div>
      <div className={styles.home_companyAdv}>
        <div className={styles.home_companyAdv_item}>
          <BsClock />
          <p>Быстрые выполнение закзов</p>
          <span>
            Современное оборудование и квалифицированные сотрудники позволяют
            быстро завершить заказ
          </span>
        </div>
        <div className={styles.home_companyAdv_item}>
          <RxCheck />
          <p>Высокое качество</p>
          <span>
            Мы используем только высококачественные материалы и современное
            оборудование для производства нашей продукции
          </span>
        </div>
        <div className={styles.home_companyAdv_item}>
          <FiTruck />
          <p>Доставка по всему миру</p>
          <span>Доставка товара в больших тиражах по России и странам СНГ</span>
        </div>
      </div>
      <div className={styles.home_contacts}>
        <div className={styles.home_contacts_left}>
          <h1 className={styles.home_title}>Контакты</h1>
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
