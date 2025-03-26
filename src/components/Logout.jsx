import { useContext } from "react"
import { useEffect } from "react"
import {  useNavigate } from "react-router-dom"

import * as authService from '../services/authService'
import { AuthContext } from "./context/AuthContext"

export default function Logout(){

    const { logoutHandler } = useContext(AuthContext)
    const navigate = useNavigate()

useEffect(()=>{
    authService.logout()
    .then(()=> logoutHandler())
    .catch(()=>{ 
        logoutHandler()
        navigate('/login')})
  
},[])


    return(
        <> </>
    )
}