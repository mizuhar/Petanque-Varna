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

  async function deleteArticle(id) {
    const { error } = await supabase
      .from("news")
      .delete()
      .eq("id", id);

    if (!error) {
      setArticles(state => state.filter(a => a.id !== id));
    }
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

            <button onClick={() => deleteArticle(article.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
