import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "./context/AuthContext";
import styles from "./Header.module.css";
import { useTranslation } from "react-i18next";
import i18n from "i18next";



export default function Header() {
  const { t } = useTranslation();
  const { isAdmin } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  function closeMenu() {
    setOpen(false);
  }

  return (
    <header className={styles.header}>
      <div className={styles.nav}>
        <button className={styles.menuToggle} onClick={() => setOpen(!open)}>
          MENU
        </button>
      </div>

      <div className={`${styles.links} ${open ? styles.active : ""}`}>
        {/* Public */}
        <Link className={styles.buttons} to="/" onClick={closeMenu}>
          {t("nav.home")}
        </Link>

        <Link className={styles.buttons} to="/about" onClick={closeMenu}>
          {t("nav.about")}
        </Link>

        <Link className={styles.buttons} to="/players" onClick={closeMenu}>
          {t("nav.players")}
        </Link>

        <Link className={styles.buttons} to="/tournaments" onClick={closeMenu}>
          {t("nav.tournaments")}
        </Link>

        <Link className={styles.buttons} to="/news" onClick={closeMenu}>
          {t("nav.news")}
        </Link>

        <Link className={styles.buttons} to="/gallery" onClick={closeMenu}>
          {t("nav.gallery")}
        </Link>
        <Link className={styles.buttons} to="/contact" onClick={closeMenu}>
          {t("nav.contact")}
        </Link>

        {/* Admin Only */}
        {isAdmin && (
          <>
            <Link className={styles.buttons} to="/admin" onClick={closeMenu}>
              {t("nav.admin")}
            </Link>

            <Link className={styles.buttons} to="/logout" onClick={closeMenu}>
             {t("nav.logout")}
            </Link>
          </>
        )}

        {/* Guest */}
        {!isAdmin && (
          <Link className={styles.buttons} to="/login" onClick={closeMenu}>
            {t("nav.adminlogin")}
          </Link>
        )}
        <div style={{ marginLeft: "auto" }}>
  <button onClick={() => {
    i18n.changeLanguage("bg");
    localStorage.setItem("lang", "bg");
  }}>
    🇧🇬
  </button>

  <button onClick={() => {
    i18n.changeLanguage("en");
    localStorage.setItem("lang", "en");
  }}>
    🇬🇧
  </button>
</div>
      </div>
    </header>
  );
}
