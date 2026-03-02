import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";

export default function NotFound() {
  return (
    <section className={styles.notFound}>
      <div className={styles.box}>
        <h1>404</h1>
        <h2>Looks like this boule rolled too far...</h2>
        <Link to="/" className={styles.button}>
          Back to Home
        </Link>
      </div>
    </section>
  );
}