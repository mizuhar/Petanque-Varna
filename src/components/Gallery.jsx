import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import styles from "./Gallery.module.css";
import { useTranslation } from "react-i18next";

export default function Gallery() {
  const {t} = useTranslation()
  const [photos, setPhotos] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    fetchGallery();
  }, []);

  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") setActiveIndex(null);
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeIndex]);

  async function fetchGallery() {
    const { data } = await supabase
      .from("gallery")
      .select("*")
      .order("created_at", { ascending: false });

    setPhotos(data || []);
  }

  function nextImage() {
    setActiveIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  }

  function prevImage() {
    setActiveIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  }

  return (
    <section className={styles.galleryPage}>
      <h1 className={styles.title}>{t('home.clubGallery')}</h1>

      <div className={styles.photoWall}>
        {photos.map((photo, index) => (
          <img
            key={photo.id}
            src={photo.image_url}
            alt={photo.caption}
            loading="lazy"
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>

      {activeIndex !== null && (
        <div className={styles.lightbox} onClick={() => setActiveIndex(null)}>
          <button className={styles.close} onClick={() => setActiveIndex(null)}>
            ✕
          </button>

          <button
            className={styles.prev}
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
          >
            ‹
          </button>

          <div
            className={styles.lightboxContent}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={photos[activeIndex].image_url}
              alt={photos[activeIndex].caption}
              className={styles.lightboxImage}
            />

            {photos[activeIndex].caption && (
              <div className={styles.captionBox}>
                {photos[activeIndex].caption}
              </div>
            )}
          </div>

          <button
            className={styles.next}
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
          >
            ›
          </button>
        </div>
      )}
    </section>
  );
}
