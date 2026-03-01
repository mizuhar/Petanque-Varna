import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "./context/AuthContext";
import styles from "./Header.module.css";

export default function Header() {
  const { isAdmin } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  function closeMenu() {
    setOpen(false);
  }

  return (
    <header className={styles.header}>
      <div className={styles.nav}>
        <button
          className={styles.menuToggle}
          onClick={() => setOpen(!open)}
        >
          MENU
        </button>
      </div>

      <div className={`${styles.links} ${open ? styles.active : ""}`}>
        {/* Public */}
        <Link className={styles.buttons} to="/" onClick={closeMenu}>
          Home
        </Link>

        <Link className={styles.buttons} to="/about" onClick={closeMenu}>
          About Us
        </Link>

        <Link className={styles.buttons} to="/players" onClick={closeMenu}>
          Meet Our Players
        </Link>

        <Link className={styles.buttons} to="/tournaments" onClick={closeMenu}>
          Tournaments
        </Link>

        <Link className={styles.buttons} to="/news" onClick={closeMenu}>
          News
        </Link>

        <Link className={styles.buttons} to="/gallery" onClick={closeMenu}>
          Gallery
        </Link>

        {/* Admin Only */}
        {isAdmin && (
          <>
            <Link className={styles.buttons} to="/admin" onClick={closeMenu}>
              Admin
            </Link>

            <Link className={styles.buttons} to="/logout" onClick={closeMenu}>
              Logout
            </Link>
          </>
        )}

        {/* Guest */}
        {!isAdmin && (
          <Link className={styles.buttons} to="/login" onClick={closeMenu}>
            Admin Login
          </Link>
        )}
      </div>
    </header>
  );
}