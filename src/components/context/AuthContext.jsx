import { createContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import usePersistedState from "../../hooks/usePersistedState"
import * as authService from '../../services/authService'


const ADMIN_EMAIL = "admin@petanquevarna.com";

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const navigate = useNavigate()
    const [isAdmin, setIsAdmin] = useState(false);
    const [ auth, setAuth ]  = usePersistedState('auth', {})

    const loginSubmitHandler =  async ({email,password}) => {

        if (email !== ADMIN_EMAIL) {
            alert("Access denied. Admins only.");
            return;
        }

        try {
            const result = await authService.login(email,password)
            setAuth(result)
            setIsAdmin(true)

            localStorage.setItem("accessToken", result.accessToken);
            navigate('/admin')
            
        } catch (error) {
             alert("Login failed");
            
        }


    
        localStorage.setItem('accessToken',result.accessToken)


         navigate('/')
    
    }
   
    const logoutHandler = () =>{

        localStorage.removeItem('accessToken')

        setAuth({})
        setIsAdmin(false);
        navigate('/')
    }

const context = {

    loginSubmitHandler,
    logoutHandler,
    userId: auth._id,
    username: auth.username || auth.email,
    email: auth.email,
    isAuthenticated: !!auth.accessToken,
    isAdmin

}



return (
   < AuthContext.Provider value= { context }>

       {children}

   </AuthContext.Provider>
)

}

export default AuthContext