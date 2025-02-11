import { useContext } from "react"
import AuthContext from "./context/AuthContext"

export default function Home(){

const { username } = useContext(AuthContext)

    return(
        <>
        <br />
        <br />
        <br />
        <p></p>
        <h1 style={{color:'wheat',fontSize:'41px',marginLeft:'4.1em',marginTop:'1em'}}>{username ? `${username}, welcome to petanque Varna!`:'Welcome to petanque Varna!'} </h1>
        </>
    )
}