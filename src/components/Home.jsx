import styles from './Home.module.css';

export default function Home() {
  return (
    <section className={styles.hero}>

      <div className={styles.badge}>Petanque Varna</div>

      <h1 className={styles.title}>
        Welcome to <br /> Petanque Varna
      </h1>

      <p className={styles.subtitle}>
        Precision • Strategy • Tradition
      </p>

      <div className={styles.actions}>
        <button className={styles.ctaPrimary}>
          Upcoming Tournaments
        </button>

        <button className={styles.ctaSecondary}>
          Club Gallery
        </button>
      </div>
<section className={styles.tournaments}>
  <h2 className={styles.sectionTitle}>Tournaments</h2>

  <div className={styles.cards}>
    <div className={styles.card}>
      <span className={styles.cardBadge}>Upcoming</span>
      <h3>Winter Cup Varna</h3>
      <p>March 2026 • Varna</p>
    </div>

    <div className={styles.card}>
      <span className={styles.cardBadge}>Open</span>
      <h3>Black Sea Open</h3>
      <p>April 2026 • Burgas</p>
    </div>
  </div>
</section>
<section className={styles.news}>
  <h2 className={styles.sectionTitle}>Latest News</h2>

  <div className={styles.newsGrid}>
    <article className={styles.newsCard}>
      <span className={styles.newsBadge}>Event</span>
      <h3>Spring Tournament Announced</h3>
      <p>Join us this April for the Black Sea Open.</p>
    </article>

    <article className={styles.newsCard}>
      <span className={styles.newsBadge}>Club</span>
      <h3>New Members Welcome</h3>
      <p>Petanque Varna continues to grow!</p>
    </article>
  </div>
</section>

    </section>
    
  );
}
