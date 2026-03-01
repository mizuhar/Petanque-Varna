import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import styles from "./AdminTournaments.module.css";

export default function AdminTournaments() {
  const [tournaments, setTournaments] = useState([]);
  const [form, setForm] = useState({
    title: "",
    location: "",
    date: "",
    description: "",
  });

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

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function createTournament(e) {
    e.preventDefault();

    const { error } = await supabase
      .from("tournaments")
      .insert([form]);

    if (!error) {
      fetchTournaments();
      setForm({
        title: "",
        location: "",
        date: "",
        description: "",
      });
    } else {
      alert("Error adding tournament");
    }
  }

  async function deleteTournament(id) {
    await supabase.from("tournaments").delete().eq("id", id);
    fetchTournaments();
  }

  return (
    <section className={styles.adminPage}>
      <h1 className={styles.title}>Admin Tournaments</h1>

      <form onSubmit={createTournament} className={styles.form}>
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <input
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
        />

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />

        <button type="submit">Add Tournament</button>
      </form>

      <div className={styles.list}>
        {tournaments.map((t) => (
          <div key={t.id} className={styles.card}>
            <h3>{t.title}</h3>
            <p>{t.date}</p>
            <p>{t.location}</p>
            <button onClick={() => deleteTournament(t.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}