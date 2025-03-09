import { useContext,useState,useEffect } from "react"
import { Link } from "react-router-dom"
import styles from './Home.module.css'

import * as playerService from '../services/playersService'
import AuthContext from "./context/AuthContext"

export default function Home(){

const { username } = useContext(AuthContext)
const [players, setPlayers] = useState([])

useEffect(() => {
    
    playerService.getLatest()
    .then(result => setPlayers(result))

}, []);

    return(
        <section>
        <br />
        <br />
        <br />
       
        <h1 style={{color:'wheat',fontSize:'51px',marginTop:'1em',marginBottom:"2.5em",width:"200%"}}>{username ? `${username}, welcome to petanque Varna!`:'Welcome to petanque Varna!'} </h1>
        <br />
                <h1 style={{marginLeft:"4.5em",marginBottom:"1em",fontSize:"43px",fontFamily:"cursive",color:"yellow"}}>Newest Players</h1>
        <div className={styles.player}>
                
                 
                 <br />
                {players.map((player) => (
                    <div className={styles.home} key={player._id} >
                    <div className="image-wrap">
                        <img style={{width:"200px",height:"300px",borderRadius:"10px",marginLeft:"2em",borderRadius:"1em"}} src={player.img} />
                    </div>
                    <h1 style={{marginLeft:"1.5em"}}>{player.title}</h1>
                  
                    <br />
                    
                    <div className="data-buttons"> 
                        <Link to={`/players/${player._id}`}   className={styles.buttons}>Details</Link> 
                     </div> 
                     <br />
                     <br />
                 </div> 
             ))}  

                
              {players.length === 0 &&  <p className="no-articles">No players yet</p>}

            </div>
               
        </section>
    )
}