import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import styles from "./Gallery.module.css";

export default function Gallery() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    fetchGallery();
  }, []);

  async function fetchGallery() {
    const { data, error } = await supabase
      .from("gallery")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setPhotos(data);
  }

  return (
    <section className={styles.galleryPage}>
      <h1 className={styles.title}>Club Gallery</h1>

      <div className={styles.photoWall}>
        {photos.map(photo => (
          <img 
            key={photo.id} 
            src={photo.image_url} 
            alt={photo.caption} 
          />
        ))}
      </div>
    </section>
  );
}
