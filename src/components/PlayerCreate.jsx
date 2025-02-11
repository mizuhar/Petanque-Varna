import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import * as playerService from '../services/playersService'

export default function PlayerCreate(){

  const navigate =   useNavigate()

  const createSubmitHandler = (e) => {

       e.preventDefault()



      const playerData =  Object.fromEntries(new FormData(e.currentTarget))  

      

        try {
            playerService.create(playerData)

            navigate('/players')
            
        } catch (error) {
            throw new Error(error)
        }

        

      

    }



    return(
        <>
        <br />
        <br />
        <br />
        <br />
        
        <section id="create-page" className="auth">
          
        <form id="create" onSubmit={createSubmitHandler}>
            <div className="container">
                <h1>Create Player</h1>
                <label htmlFor="leg-title"></label>
                <input type="text" id="title" name="title" placeholder="Enter player title..." />
<br />
                <label htmlFor="description"></label>
                <input type="text" id="description" name="description" placeholder="Enter player description..." />

                <br />

                <label htmlFor="player-img"></label>
                <input type="text" id="imageUrl" name="img" placeholder="Upload a photo..." />

                <br />
                <br />
                <input  className="btn submit" type="submit" value="Create Player" />
            </div>
        </form>
    </section>
    </>
    )
}