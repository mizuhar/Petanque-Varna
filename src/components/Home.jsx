import { useState, useEffect } from "react";
import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

export default function Home() {
  const navigate = useNavigate();
  const [upcoming, setUpcoming] = useState(null);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchHomeData();
  }, []);
  async function fetchHomeData() {
    setLoading(true);

    const today = new Date().toISOString();

    // 🔹 Try to get upcoming
    const { data: upcomingData } = await supabase
      .from("tournaments")
      .select("*")
      .gte("date", today)
      .order("date", { ascending: true })
      .limit(1);

    let tournamentToShow = null;
    let isPast = false;

    if (upcomingData && upcomingData.length > 0) {
      tournamentToShow = upcomingData[0];
    } else {
      // 🔹 If no upcoming, get latest past
      const { data: pastData } = await supabase
        .from("tournaments")
        .select("*")
        .lt("date", today)
        .order("date", { ascending: false })
        .limit(1);

      if (pastData && pastData.length > 0) {
        tournamentToShow = pastData[0];
        isPast = true;
      }
    }

    const { data: newsData } = await supabase
      .from("news")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(2);

    setUpcoming({ ...tournamentToShow, isPast });
    setNews(newsData || []);
    setLoading(false);
  }
  return (
    <section className={styles.hero}>
      <div className={styles.badge}>Petanque Varna</div>

      <h1 className={styles.title}>
        Welcome to <br /> Petanque Varna
      </h1>

      <p className={styles.subtitle}>Precision • Strategy • Tradition</p>

      <div className={styles.actions}>
        <button
          onClick={() => navigate("/tournaments")}
          className={styles.ctaPrimary}
        >
          View Upcoming Tournament
        </button>

        <button
          onClick={() => navigate("/gallery")}
          className={styles.ctaSecondary}
        >
          Explore Gallery
        </button>
      </div>
      <section className={styles.tournaments}>
        <h2 className={styles.sectionTitle}>Tournaments</h2>

        <div className={styles.cards}>
          {loading ? (
            <p>Loading...</p>
          ) : upcoming ? (
            <article className={styles.card}>
              <span
                className={`${styles.cardBadge} ${
                  upcoming.isPast ? styles.completed : ""
                }`}
              >
                {upcoming.isPast ? "Completed" : "Upcoming"}
              </span>

              <h3>{upcoming.title}</h3>

              <p>
                {new Date(upcoming.date).toLocaleDateString()} •{" "}
                {upcoming.location}
              </p>
            </article>
          ) : (
            <article className={styles.card}>
              <span className={styles.cardBadge}>No Events</span>
              <h3>Stay tuned</h3>
              <p>New tournaments will be announced soon.</p>
            </article>
          )}
        </div>
      </section>
      <section className={styles.news}>
        <h2 className={styles.sectionTitle}>Latest News</h2>

        <div className={styles.newsGrid}>
          {loading ? (
            <p>Loading...</p>
          ) : news.length > 0 ? (
            news.map((article) => (
              <article key={article.id} className={styles.newsCard}>
                <span className={styles.badge}>{article.category}</span>
                <h3>{article.title}</h3>
                <p>{article.content.substring(0, 80)}...</p>
              </article>
            ))
          ) : (
            <p>No news yet</p>
          )}
        </div>
      </section>
    </section>
  );
}
