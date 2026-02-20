import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { Link } from "react-router-dom";

export default function Players() {
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

  async function deletePlayer(id) {
    const { error } = await supabase
      .from("players")
      .delete()
      .eq("id", id);

    if (!error) {
      setPlayers(state => state.filter(p => p.id !== id));
    }
  }

  return (
    <section>
      <h1>Players</h1>

      {players.map(player => (
        <div key={player.id}>
          <img src={player.img} alt={player.title} width="120" />
          <h3>{player.title}</h3>
          <p>{player.description}</p>

          <Link to={`/players/edit/${player.id}`}>Edit</Link>
          <button onClick={() => deletePlayer(player.id)}>Delete</button>
        </div>
      ))}
    </section>
  );
}
