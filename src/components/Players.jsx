import {useState, useEffect} from 'react'
import * as playersService from '../services/playersService'
import PlayersItem from './PlayersItem'
export default function Players(){

    const [players,setPlayers] = useState([])

    useEffect(()=>{
         playersService.getAll()
         .then(setPlayers)
         .catch(err => console.log(err))

    },[])



    return(
   <section>
        <br />
        <br />
        <br />
       {players.map(player => <PlayersItem key={player._id} {...player}/>)}
      
       </section>  
    )
    
}