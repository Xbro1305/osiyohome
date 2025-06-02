import styles from "./About.module.scss";
import logo from "../../assets/logo.jpg";
import infoblock1 from "../../assets/infoblock_1.jpg";
import infoblock2 from "../../assets/infoblock_2.jpg";
import infoblock3 from "../../assets/infoblock3.webp";
import infoblock4 from "../../assets/odnotonniy.webp";
import infoblock5 from "../../assets/pechat.jpg";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { runIntersectionAnimation } from "../../widgets/Animation";

export const About = () => {
  const { t } = useTranslation();

  useEffect(() => {
    setTimeout(() => {
      runIntersectionAnimation();
    }, 100);
  }, []);

  return (
    <div className={styles.about}>
      <div className={` ${styles.about_item}`}>
        <p className="element-animation el">
          {t("companyDescription_1")}
          <br />
          <br />
          {t("companyDescription_2")}
          <br />
          <br />
          {t("companyDescription_3")}
        </p>
        <img className="element-animation er" src={logo} alt="" />
      </div>
      <div className={styles.about_item}>
        <p className="element-animation er">
          {t("cottonYarnProduction")} <br />
          <br />
        </p>
        <img className="element-animation el" src={infoblock3} alt="" />
      </div>
      <div className={styles.about_item}>
        <p className="element-animation el">
          {t("productionBase_1")} <br />
          <br />
          <span
            dangerouslySetInnerHTML={{
              __html: t("mainProductParameters_title"),
            }}
          />
          <span
            dangerouslySetInnerHTML={{
              __html: t("mainProductParameters_list"),
            }}
          />
          <br />
          <span
            dangerouslySetInnerHTML={{ __html: t("equipmentAndStaff_1") }}
          />
        </p>
        <img className="element-animation er" src={infoblock2} alt="" />
      </div>
      <div className={styles.about_item}>
        <p className="element-animation er">
          {t("cottonFabrics_description")}
          <span dangerouslySetInnerHTML={{ __html: t("cottonFabrics_list") }} />
          <br /> {t("cottonFabricsAdvantages_description")}
          <span
            dangerouslySetInnerHTML={{
              __html: t("cottonFabricsAdvantages_list"),
            }}
          />
        </p>
        <img className="element-animation el" src={infoblock1} alt="" />
      </div>
      <div className={styles.about_item}>
        <p
          className="element-animation er"
          dangerouslySetInnerHTML={{ __html: t("infoblock4") }}
        />
        <img className="element-animation el" src={infoblock4} alt="" />
      </div>
      <div className={styles.about_item}>
        <p
          className="element-animation er"
          dangerouslySetInnerHTML={{ __html: t("infoblock5") }}
        />
        <img className="element-animation el" src={infoblock5} alt="" />
      </div>
    </div>
  );
};
