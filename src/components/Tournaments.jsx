import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import styles from "./Tournaments.module.css";

export default function Tournaments() {
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    fetchTournaments();
  }, []);

  async function fetchTournaments() {
    const { data } = await supabase
      .from("tournaments")
      .select("*")
      .order("date", { ascending: true });

    setTournaments(data || []);
  }

  const today = new Date();

  const upcoming = tournaments.filter(
    (t) => new Date(t.date) >= today
  );

  const past = tournaments
    .filter((t) => new Date(t.date) < today)
    .reverse();

  return (
    <section className={styles.page}>
      <h1 className={styles.title}>Tournaments</h1>

      {upcoming.length > 0 && (
        <>
          <h2 className={styles.sectionTitle}>Upcoming</h2>
          <div className={styles.grid}>
            {upcoming.map((t) => (
              <article key={t.id} className={styles.card}>
                <span className={styles.badgeUpcoming}>
                  Upcoming
                </span>
                <h3>{t.title}</h3>
                <p className={styles.meta}>
                  {t.date} • {t.location}
                </p>
                <p>{t.description}</p>
              </article>
            ))}
          </div>
        </>
      )}

      {past.length > 0 && (
        <>
          <h2 className={styles.sectionTitle}>Past</h2>
          <div className={styles.grid}>
            {past.map((t) => (
              <article key={t.id} className={styles.card}>
                <span className={styles.badgePast}>
                  Completed
                </span>
                <h3>{t.title}</h3>
                <p className={styles.meta}>
                  {t.date} • {t.location}
                </p>
                <p>{t.description}</p>
              </article>
            ))}
          </div>
        </>
      )}
    </section>
  );
}