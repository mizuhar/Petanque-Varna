import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "./context/AuthContext";
import styles from './Header.module.css'
export default function Header() {
  const { isAdmin } = useContext(AuthContext);

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link className={styles.buttons} to="/">Home</Link>
        <Link className={styles.buttons} to="/about">About Us</Link>

        {isAdmin && (
          <>
            <Link className={styles.buttons} to="/players">Players</Link>
            <Link className={styles.buttons} to="/players/create">New Player</Link>
            <Link className={styles.buttons} to="/logout">Logout</Link>
          </>
        )}

        {!isAdmin && (
          <Link className={styles.buttons} to="/login">Admin Login</Link>
        )}
      </nav>
    </header>
  );
}


