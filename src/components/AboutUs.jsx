import styles from "./AboutUs.module.css";
import { useTranslation } from "react-i18next";

export default function AboutUs() {
  const { t } = useTranslation();
  return (
    <section className={styles.about}>
      
      <div className={styles.hero}>
        <h1 className={styles.title}>{t("about.aboutUs")}</h1>
        <h2 className={styles.subtitle}>
          {t("about.more")}
        </h2>
      </div>

      <div className={styles.content}>
        <p> {t("about.text")}</p>

       
      </div>

      <div className={styles.imageWrapper}>
        <img src="/img/8.jpg" alt="Petanque Club Varna" />
      </div>

    </section>
  );
}