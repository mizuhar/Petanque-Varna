import { createContext } from "react"
import { useNavigate } from "react-router-dom"
import usePersistedState from "../../hooks/usePersistedState"
import * as authService from '../../services/authService'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

    const navigate = useNavigate()

    const [ auth, setAuth ]  = usePersistedState('auth', {})

    const loginSubmitHandler =  async ({email,password}) => {

        const result = await authService.login(email,password)

        setAuth(result)
    
        localStorage.setItem('accessToken',result.accessToken)


         navigate('./')
    
    }
    const registerSubmitHandler = async ({email,password}) => {

        const result =  await  authService.register(email,password)

        setAuth(result)
       
         localStorage.setItem('accessToken', result.accessToken)
       
         navigate('/')
       
           
         }
    const logoutHandler = () =>{

        localStorage.removeItem('accessToken')

        setAuth({})

        navigate('/')
    }

const context = {

    loginSubmitHandler,
    registerSubmitHandler,
    logoutHandler,
    userId: auth._id,
    username: auth.username || auth.email,
    email: auth.email,
    isAuthenticated: !!auth.accessToken,

}



return (
   < AuthContext.Provider value= { context }>

       {children}

   </AuthContext.Provider>
)

}

export default AuthContext