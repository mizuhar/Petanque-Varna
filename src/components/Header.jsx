import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "./context/AuthContext";
import styles from './Header.module.css'
export default function Header(){

    const { isAuthenticated } = useContext(AuthContext)


    return(
     
        <div>

             {/* {isAuthenticated && 
            <>
         <p style={{fontSize:'27px',marginLeft:'-5em', fontWeight:'bold'}}>Current user: {username}</p>
            </>
            } */}
        <nav style={{marginTop:'-17em'}}>
       
            
         <Link className={styles.buttons} to='/'>Home</Link>
         <Link className={styles.buttons} to='/about'>About Us</Link>
            {isAuthenticated && 
          <>
          <Link className={styles.buttons} to='/players'>Players</Link>
          <Link className={styles.buttons} to='/players/create'>New Player</Link>
          <Link className={styles.buttons} to='/logout'>Logout</Link>
          
          </>
            }
            {!isAuthenticated && 
            <>
            <Link className={styles.buttons} to='/login'>Login</Link>
            <Link className={styles.buttons} to='/register'>Register</Link>
            
            </>
            }

        </nav>
        </div>
       
    )
}

