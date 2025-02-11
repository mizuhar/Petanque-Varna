import { useContext } from "react"
import { useEffect } from "react"

import * as authService from '../services/authService'
import { AuthContext } from "./context/AuthContext"

export default function Logout(){

    const { logoutHandler } = useContext(AuthContext)

useEffect(()=>{
    authService.logout()
    .then(()=> logoutHandler())
  
},[])


    return(
        <> </>
    )
}