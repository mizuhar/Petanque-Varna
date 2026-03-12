import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import styles from "./Players.module.css";
import { useTranslation } from "react-i18next";

export default function Players() {
  const { t } = useTranslation()
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    fetchPlayers();
  }, []);

  async function fetchPlayers() {
    const { data, error } = await supabase
      .from("players")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setPlayers(data);
  }

  return (
    <section className={styles.playersPage}>
      <h1 className={styles.title}>{t("players.meet")}</h1>

      <div className={styles.grid}>
  {players.map(player => (
    <div key={player.id} className={styles.card}>
      
      <img
        src={player.image_url}
        alt={player.name}
        className={styles.image}
      />

      <h3>{player.name}</h3>

      {player.nickname && (
        <span className={styles.nickname}>
          "{player.nickname}"
        </span>
      )}

      <p className={styles.description}>
        {player.description}
      </p>

      {player.bio && (
        <p className={styles.bio}>
          {player.bio}
        </p>
      )}

    </div>
  ))}
</div>

    </section>
  );
}
