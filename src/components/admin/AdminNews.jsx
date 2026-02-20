import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function AdminNews() {
  const [form, setForm] = useState({
    title: "",
    content: "",
    category: "Event",
  });

  function onChange(e) {
    setForm(state => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  }

  async function onSubmit(e) {
    e.preventDefault();

    const { error } = await supabase
      .from("news")
      .insert([form]);

    if (!error) {
      alert("News published 😎");
      setForm({ title: "", content: "", category: "Event" });
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <h2>Add News</h2>

      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={onChange}
      />

      <textarea
        name="content"
        placeholder="Content"
        value={form.content}
        onChange={onChange}
      />

      <select
        name="category"
        value={form.category}
        onChange={onChange}
      >
        <option value="Event">Event</option>
        <option value="Club">Club</option>
        <option value="Results">Results</option>
      </select>

      <button type="submit">Publish</button>
    </form>
  );
}
