import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>

        <div className={styles.column}>
          <h3>Petanque Varna</h3>
          <p>Precision • Strategy • Tradition</p>
        </div>

        <div className={styles.column}>
          <h4>Quick Links</h4>
          <Link to="/">Home</Link>
          <Link to="/tournaments">Tournaments</Link>
          <Link to="/news">News</Link>
          <Link to="/contact">Contact</Link>
        </div>

        <div className={styles.column}>
          <h4>Contact</h4>
          <p>petanque_varna@abv.bg</p>
          <p>Varna, Bulgaria</p>
        </div>

      </div>

      <div className={styles.bottom}>
        © {new Date().getFullYear()} Petanque Varna • Design: Vladislav Stanchev
      </div>
    </footer>
  );
}