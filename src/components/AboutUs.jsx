import styles from "./AboutUs.module.css";

export default function AboutUs() {
  return (
    <section className={styles.about}>
      
      <div className={styles.hero}>
        <h1 className={styles.title}>About Us</h1>
        <h2 className={styles.subtitle}>
          We are champions from Petanque Club Varna!
        </h2>
      </div>

      <div className={styles.content}>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Libero reiciendis eaque repellat incidunt vitae minus recusandae laudantium,
          voluptas quasi itaque sint impedit harum ducimus esse cupiditate
          pariatur consequatur enim sapiente.
        </p>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Libero reiciendis eaque repellat incidunt vitae minus recusandae laudantium,
          voluptas quasi itaque sint impedit harum ducimus esse cupiditate
          pariatur consequatur enim sapiente.
        </p>
      </div>

      <div className={styles.imageWrapper}>
        <img src="/img/8.jpg" alt="Petanque Club Varna" />
      </div>

    </section>
  );
}