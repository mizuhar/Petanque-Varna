import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { uploadImage } from "../../services/galleryService";
import styles from "./AdminGallery.module.css";

export default function AdminGallery() {
  const [images, setImages] = useState([]);
  const [form, setForm] = useState({
    image_url: "",
    caption: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [editingImage, setEditingImage] = useState(null);
  const [file, setFile] = useState(null);





  useEffect(() => {
    fetchGallery();
  }, []);

  async function fetchGallery() {
    const { data, error } = await supabase
      .from("gallery")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setImages(data);
  }

  function onChange(e) {
    setForm(state => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  }

  // ➕ CREATE
async function createImage(e) {
  e.preventDefault();

  try {
    let imageUrl = form.image_url;

    // ✅ Ако има качен файл → Storage upload
    if (file) {
      imageUrl = await uploadImage(file);
    }

    // ❌ Ако няма URL и няма файл
    if (!imageUrl) {
      alert("Provide image URL or upload file");
      return;
    }

    const { data, error } = await supabase
      .from("gallery")
      .insert([{
        image_url: imageUrl,
        caption: form.caption
      }])
      .select();

    if (error) throw error;

    setImages(state => [data[0], ...state]);
    setForm({ image_url: "", caption: "" });
    setFile(null);

  } catch (err) {
    alert("Upload failed");
    console.error(err);
  }
}


  // 🗑 DELETE
 async function deleteImage(id) {
  const { data, error } = await supabase
    .from("gallery")
    .delete()
    .eq("id", id)
    .select();

 

  if (error) {
    alert("Delete failed");
    console.error(error);
    return;
  }

  if (!data || data.length === 0) {
    alert("No image was deleted. Check RLS policies.");
    return;
  }

  setImages(state => state.filter(img => img.id !== id));
}

  // ✏️ EDIT
  function openEditModal(image) {
    setEditingImage(image);
    setShowModal(true);
  }

  async function updateImage(e) {
    e.preventDefault();

    const { error } = await supabase
      .from("gallery")
      .update({
        image_url: editingImage.image_url,
        caption: editingImage.caption,
      })
      .eq("id", editingImage.id);

    if (!error) {
      setImages(state =>
        state.map(img =>
          img.id === editingImage.id ? editingImage : img
        )
      );

      setShowModal(false);
    }
  }

  return (
    <section className={styles.adminGallery}>
      <h1 className={styles.title}>Admin Gallery</h1>

      {/* CREATE */}
      <form onSubmit={createImage} className={styles.form}>

<input
  name="image_url"
  placeholder="Paste Image URL (optional)"
  value={form.image_url}
  onChange={onChange}
  className={styles.input}
/>

<div className={styles.or}>OR</div>

<input
  type="file"
  accept="image/*"
  onChange={(e) => setFile(e.target.files[0])}
  className={styles.fileInput}
/>


  <input
    name="caption"
    placeholder="Caption"
    value={form.caption}
    onChange={onChange}
    className={styles.input}
  />

  <button type="submit" className={styles.publishBtn}>
    Upload Image
  </button>

</form>


      {/* LIST */}
      <div className={styles.galleryGrid}>
        {images.map(img => (
          <div key={img.id} className={styles.card}>
            <img src={img.image_url} alt={img.caption} />
            <p>{img.caption}</p>

            <div className={styles.actions}>
              <button onClick={() => openEditModal(img)}>
                Edit ✏️
              </button>

              <button onClick={() => deleteImage(img.id)}>
                Delete 🗑
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>Edit Image</h2>
  <span className={styles.modalBadge}>
    Editing Image
  </span>
            <form onSubmit={updateImage}>
              <input
                value={editingImage.image_url}
                onChange={e =>
                  setEditingImage({
                    ...editingImage,
                    image_url: e.target.value,
                  })
                }
              />

              <input
                value={editingImage.caption}
                onChange={e =>
                  setEditingImage({
                    ...editingImage,
                    caption: e.target.value,
                  })
                }
              />

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
