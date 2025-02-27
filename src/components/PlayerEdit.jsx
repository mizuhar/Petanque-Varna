import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as playerService from '../services/playersService'

export default function PlayerEdit(){
   
    const navigate = useNavigate()
   const { id } = useParams()
   //const [value,setValue] = useState()
   const [player, setPlayer] = useState({})

    useEffect(()=>{
        
        playerService.getOne(id)
        .then(result => setPlayer(result))

    },[id])

   

    const onChange = (e) =>{

      return  setPlayer(state => ({...state,[e.target.name]: e.target.value}))

    }

    console.log(player);

    const editSubmitHandler = (e)=>{

        e.preventDefault()

        const playerData = Object.fromEntries(new FormData(e.currentTarget))

        try {
            playerService.update(id, playerData)

            navigate('/players')
            
        } catch (error) {
            console.log(error);
        }
     
    
}



    return(
        <>
        <br />
        <br />
        <br />
        <br />
        
        <section id="create-page" className="auth">
          
        <form id="create" onSubmit={editSubmitHandler}>
            <div className="container">
                <h1>Edit Player</h1>
                <label htmlFor="leg-title"></label>
                <input type="text" 
                id="title" 
                name="title" 
                placeholder="Enter player title..." 
                onChange={onChange}
                value={player.title}
                />
<br />
                <label htmlFor="description"></label>
                <input  type="text" 
                        id="description" 
                        name="description"
                        placeholder="Enter player description..." 
                        onChange={onChange}
                        value={player.description}
                        />

                <br />

                <label htmlFor="player-img"></label>
                <input type="text" 
                       id="imageUrl" 
                       name="img" 
                       placeholder="Upload a photo..."
                       onChange={onChange}
                       value={player.img}
                        />

                <br />
                <br />
                <input  className="btn submit" 
                        type="submit" 
                        value="Update" />
            </div>
        </form>
    </section>
    </>
    )
}