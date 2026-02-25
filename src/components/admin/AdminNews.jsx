import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import styles from "./AdminNews.module.css";

export default function AdminNews() {
  const [articles, setArticles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);

  const [form, setForm] = useState({
    title: "",
    content: "",
    category: "news",
  });

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

  function onChange(e) {
    setForm(state => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  }

  async function createNews(e) {
    e.preventDefault();

    const { data, error } = await supabase
      .from("news")
      .insert([form])
      .select();

    if (!error) {
      setArticles(state => [data[0], ...state]);
      setForm({ title: "", content: "", category: "news" });
    }
  }

  async function deleteNews(id) {
    const { error } = await supabase
      .from("news")
      .delete()
      .eq("id", id);

    if (!error) {
      setArticles(state => state.filter(a => a.id !== id));
    }
  }

  function openEditModal(article) {
    setEditingArticle(article);
    setShowModal(true);
  }

  async function updateNews(e) {
    e.preventDefault();

    const { error } = await supabase
      .from("news")
      .update({
        title: editingArticle.title,
        content: editingArticle.content,
        category: editingArticle.category,
      })
      .eq("id", editingArticle.id);

    if (!error) {
      setArticles(state =>
        state.map(a =>
          a.id === editingArticle.id ? editingArticle : a
        )
      );

      setShowModal(false);
    }
  }

  return (
    <section className={styles.adminNews}>
      <h1 className={styles.title}>Admin News</h1>

      {/* CREATE */}
      <form onSubmit={createNews} className={styles.form}>
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={onChange}
          className={styles.input}
        />

        <textarea
          name="content"
          placeholder="Content"
          value={form.content}
          onChange={onChange}
           className={styles.textarea} 
        />

        <select
          name="category"
          value={form.category}
          onChange={onChange}
           className={styles.select}
        >
          <option value="news">News</option>
          <option value="tournament">Tournament</option>
          <option value="results">Results</option>
        </select>

        <button type="submit" className={styles.publishBtn}>Publish</button>
      </form>

 {/* LIST */}
<div className={`${styles.newsList} ${showModal ? styles.blurred : ''}`}>
  {articles.map(article => (
    <div key={article.id} className={styles.card}>
      <span>{article.category}</span>
      <h3>{article.title}</h3>
      <p>{article.content}</p>

      <div className={styles.actions}>
        <button onClick={() => openEditModal(article)}>
          Edit ✏️
        </button>

        <button onClick={() => deleteNews(article.id)}>
          Delete 🗑
        </button>
      </div>
    </div>
  ))}
</div>

      {/* EDIT MODAL */}
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>Edit News</h2>
  <span className={styles.modalBadge}>
    Editing Article
  </span>
            <form onSubmit={updateNews}>
              <input
                value={editingArticle.title}
                onChange={e =>
                  setEditingArticle({
                    ...editingArticle,
                    title: e.target.value,
                  })
                }
              />

              <textarea
                value={editingArticle.content}
                onChange={e =>
                  setEditingArticle({
                    ...editingArticle,
                    content: e.target.value,
                  })
                }
              />

              <select
                value={editingArticle.category}
                onChange={e =>
                  setEditingArticle({
                    ...editingArticle,
                    category: e.target.value,
                  })
                }
              >
                <option value="news">News</option>
                <option value="tournament">Tournament</option>
                <option value="results">Results</option>
              </select>

              <div className={styles.modalActions}>
                <button type="submit">Save</button>
                <button onClick={() => setShowModal(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
