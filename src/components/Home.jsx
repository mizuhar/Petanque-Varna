import { useState, useEffect } from "react";
import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";

export default function Home() {
  const { t } = useTranslation();
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

    setUpcoming({...tournamentToShow,isPast});
    setNews(newsData || []);
    setLoading(false);
  }
  return (
    <>
     <Helmet>
      <title>Petanque Varna | Official Petanque Club</title>

      <meta
        name="description"
        content="Official website of Petanque Varna. Discover tournaments, players, news and gallery."
      />

      <meta property="og:title" content="Petanque Varna" />
      <meta
        property="og:description"
        content="Official website of Petanque Varna – tournaments, players and club news."
      />
      <meta property="og:image" content="/preview.jpg" />
      <meta property="og:type" content="website" />
    </Helmet>
   
    <section className={styles.hero}>
      <div className={styles.badge}>{t("home.petanque")}</div>

      <h1 className={styles.title}>
         {t("home.welcome")}
      </h1>

      <p className={styles.subtitle}>{t("home.subtitle")}</p>

      <div className={styles.actions}>
        <button
          onClick={() => navigate("/tournaments")}
          className={styles.ctaPrimary}
        >
         {t("home.viewTournament")}
        </button>

        <button
          onClick={() => navigate("/gallery")}
          className={styles.ctaSecondary}
        >
           {t("home.exploreGallery")}
        </button>
      </div>
      <section className={styles.tournaments}>
        <h2 className={styles.sectionTitle}>{t("home.tournaments")}</h2>

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
              <h3>{t("home.stayTuned")}</h3>
              <p style={{fontSize:"32px",fontWeight:"bold"}}>{t("home.newTournament")}</p>
            </article>
          )}
        </div>
      </section>
      <section className={styles.news}>
        <h2 className={styles.sectionTitle}>{t("home.news")}</h2>

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
            <p style={{fontSize:"32px",fontWeight:"bold"}}>{t("home.noNewsYet")}</p>
          )}
        </div>
      </section>
    </section>
    </>
  );
}
