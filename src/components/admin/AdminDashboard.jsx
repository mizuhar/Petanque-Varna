import { Link } from "react-router-dom";
import styles from "./AdminDashboard.module.css";

export default function AdminDashboard() {
  return (
    <section className={styles.dashboard}>
       
      <h1 className={styles.title}>Admin Panel</h1>
      <p className={styles.subtitle}>Manage website content</p>

      <div className={styles.grid}>
        <Link to="/admin/news" className={styles.card}>
          📰 News
        </Link>

        <Link to="/admin/gallery" className={styles.card}>
          📸 Gallery
        </Link>

        <Link to="/admin/players" className={styles.card}>
          🏐 Players
        </Link>

        <Link to="/" className={styles.card}>
          🌍 Back to Site
        </Link>
      </div>
    </section>
  );
}
