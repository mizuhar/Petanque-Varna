import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import styles from "./News.module.css";

export default function News() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchNews();
  }, []);

  async function fetchNews() {
    const { data, error } = await supabase
      .from("news")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setArticles(data);
  }

  

  return (
    <section className={styles.newsPage}>
      <h1 className={styles.title}>Latest News</h1>

      <div className={styles.grid}>
        {articles.map(article => (
          <div key={article.id} className={styles.card}>
            
            <span className={styles.badge}>{article.category}</span>

            <h2>{article.title}</h2>
            <p>{article.content}</p>

            
          </div>
        ))}
      </div>
    </section>
  );
}
