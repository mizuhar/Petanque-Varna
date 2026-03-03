import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import styles from "./AdminPlayers.module.css";

export default function AdminPlayers() {
  const [players, setPlayers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingPlayer, setEditingPlayer] = useState(null);
  const [file, setFile] = useState(null);

  const [form, setForm] = useState({
    name: "",
    nickname: "",
    bio: "",
    image_url: "",
  });

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

  function onChange(e) {
    setForm((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  }

  // ➕ CREATE PLAYER
  async function createPlayer(e) {
    e.preventDefault();

    let imageUrl = form.image_url;

    try {
      if (file) {
        const fileExt = file.name.split(".").pop();
        const fileName = `${crypto.randomUUID()}.${fileExt}`;
        const filePath = `players/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("gallery")
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage
          .from("gallery")
          .getPublicUrl(filePath);

        imageUrl = data.publicUrl;
      }

      const { data, error } = await supabase
        .from("players")
        .insert([
          {
            name: form.name,
            nickname: form.nickname,
            bio: form.bio,
            image_url: imageUrl,
          },
        ])
        .select();

      if (error) throw error;

      setPlayers((state) => [data[0], ...state]);

      setForm({
        name: "",
        nickname: "",
        bio: "",
        image_url: "",
      });

      setFile(null);
    } catch (err) {
      alert("Failed to create player");
      console.error(err);
    }
  }

  // 🗑 DELETE
  async function deletePlayer(id) {
    const { error } = await supabase.from("players").delete().eq("id", id);

    if (!error) {
      setPlayers((state) => state.filter((p) => p.id !== id));
    }
  }

  // ✏️ OPEN EDIT
  function openEditModal(player) {
    setEditingPlayer(player);
    setShowModal(true);
  }

  // 💾 UPDATE
  async function updatePlayer(e) {
    e.preventDefault();

    const { error } = await supabase
      .from("players")
      .update({
        name: editingPlayer.name,
        nickname: editingPlayer.nickname,
        bio: editingPlayer.bio,
        image_url: editingPlayer.image_url,
      })
      .eq("id", editingPlayer.id);

    if (!error) {
      setPlayers((state) =>
        state.map((p) => (p.id === editingPlayer.id ? editingPlayer : p)),
      );

      setShowModal(false);
    }
  }

  return (
    <section className={styles.adminPlayers}>
      <h1 className={styles.title}>Admin Players</h1>

      {/* CREATE */}
      <form onSubmit={createPlayer} className={styles.form}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={onChange}
        />

        <input
          name="nickname"
          placeholder="Nickname"
          value={form.nickname}
          onChange={onChange}
        />

        <textarea
          name="bio"
          placeholder="Bio"
          value={form.bio}
          onChange={onChange}
        />

        <input
          name="image_url"
          placeholder="Image URL (optional)"
          value={form.image_url}
          onChange={onChange}
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button type="submit" className={styles.publishBtn}>
          Add Player
        </button>
      </form>

      {/* LIST */}
      <div className={styles.playersGrid}>
        {players.map((player) => (
          <div key={player.id} className={styles.card}>
            <div className={styles.imageWrapper}>
              <img src={player.image_url} alt={player.name} />
            </div>
            <h3>{player.name}</h3>
            <span>{player.nickname}</span>
            <p>{player.bio}</p>

            <div className={styles.actions}>
              <button onClick={() => openEditModal(player)}>Edit ✏️</button>

              <button onClick={() => deletePlayer(player.id)}>Delete 🗑</button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {showModal && (
        <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2>Edit Player</h2>

            <form onSubmit={updatePlayer}>
              <input
                value={editingPlayer.name}
                onChange={(e) =>
                  setEditingPlayer({
                    ...editingPlayer,
                    name: e.target.value,
                  })
                }
              />

              <input
                value={editingPlayer.nickname}
                onChange={(e) =>
                  setEditingPlayer({
                    ...editingPlayer,
                    nickname: e.target.value,
                  })
                }
              />

              <textarea
                value={editingPlayer.bio}
                onChange={(e) =>
                  setEditingPlayer({
                    ...editingPlayer,
                    bio: e.target.value,
                  })
                }
              />

              <input
                value={editingPlayer.image_url}
                onChange={(e) =>
                  setEditingPlayer({
                    ...editingPlayer,
                    image_url: e.target.value,
                  })
                }
              />

              <div className={styles.modalActions}>
                <button type="submit">Save</button>
                <button onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
