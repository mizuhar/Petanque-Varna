import { useContext } from "react"
import { useEffect, useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import * as playersService from "../services/playersService"
import AuthContext from "./context/AuthContext"
import styles from './Header.module.css'

export default function PlayerDetails(){
      
     const navigate = useNavigate()
     const { id } = useParams()
     const { userId, username } = useContext(AuthContext)
     const [ player,setPlayer ] = useState({})

useEffect(()=>{

playersService.getOne(id)
.then(setPlayer)



},[id])


const removeHandler = async () =>{


    const hasConfirm = confirm(`${username}, are you sure you want to remove: ${player.title}?`)

    if(hasConfirm){
        await playersService.remove(id)
     

        navigate('/players')
    }


   
    
}


    return (
        <>
        <br />
        <br />
        <br />
        <br />
        <h1>{player.title}</h1>
        <br />
        <br />
        <img style={{width:"350px",borderRadius:"20px",marginLeft:"-1em"}} src={player.img} alt="pic1" />
        <br />
        <br />
        <br />
        <p style={{fontSize:"33px",fontWeight:'bold',color:'wheat'}}>{player.description}</p>
        <br />
        <br />
       
       
        {player._ownerId === userId && 
        <div style={{marginLeft:'-5em'}}>
            <Link to={`/players/edit/${id}`} className={styles.buttons} >Edit</Link>
            <Link  className={styles.buttons} onClick={removeHandler}>Delete</Link>
        </div>
        }
        </>
    )
}