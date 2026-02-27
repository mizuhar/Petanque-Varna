import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "./context/AuthContext";
import styles from "./Header.module.css";

export default function Header() {
  const { isAdmin } = useContext(AuthContext);

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        {/* Public */}
        <Link className={styles.buttons} to="/">
          Home
        </Link>
        <Link className={styles.buttons} to="/about">
          About Us
        </Link>
        <Link className={styles.buttons} to="/players">
          {" "}
          Meet Our Players
        </Link>
        <Link className={styles.buttons} to="/tournaments">
          Tournaments
        </Link>
        <Link className={styles.buttons} to="/news">
          News
        </Link>
        <Link className={styles.buttons} to="/gallery">
          Gallery
        </Link>

        {/* Admin Only */}
        {isAdmin && (
          <>
            <Link className={styles.buttons} to="/admin">
              Admin
            </Link>
            <Link className={styles.buttons} to="/logout">
              Logout
            </Link>
          </>
        )}

        {/* Guest */}
        {!isAdmin && (
          <Link className={styles.buttons} to="/login">
            Admin Login
          </Link>
        )}
      </nav>
    </header>
  );
}
