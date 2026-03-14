import styles from "./Contact.module.css";
import { useTranslation } from "react-i18next";


export default function Contact() {
  const {t} = useTranslation()
  return (
    <section className={styles.contactPage}>
      <h1 className={styles.title}>{t('contact.contactUs')}</h1>

      <p className={styles.subtitle}>
       {t("contact.contact")}
      </p>

      <div className={styles.grid}>
        <div className={styles.card}>
          <h3>Email</h3>
          <a href="mailto:petanquevarna@gmail.com">
            petanque_varna@abv.bg
          </a>
        </div>

        <div className={styles.card}>
          <h3>Phone</h3>
          <a href="tel:+359888123456">
            +359 878 672 227
          </a>
          <br />
          <a href="tel:+359888123456">
            +359 899 990 291
          </a>
        </div>

        <div className={styles.card}>
          <h3>Location</h3>
          <p>Varna, Bulgaria</p>
        </div>
      </div>
    </section>
  );
}