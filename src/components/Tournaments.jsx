import styles from "./Tournaments.module.css";

export default function Tournaments() {
  return (
    <section className={styles.poster}>

      <h1 className={styles.title}>Tournaments</h1>

      <div className={styles.board}>

        <article className={styles.card}>
          <span className={styles.badge}>Upcoming</span>
          <h3>Winter Cup Varna</h3>
          <p>March 2026 • Varna</p>
        </article>

        <article className={styles.card}>
          <span className={styles.badge}>Open</span>
          <h3>Black Sea Open</h3>
          <p>April 2026 • Burgas</p>
        </article>

        <article className={styles.card}>
          <span className={styles.badge}>Completed</span>
          <h3>Autumn Doubles</h3>
          <p>October 2025 • Varna</p>
        </article>

      </div>

    </section>
  );
}
