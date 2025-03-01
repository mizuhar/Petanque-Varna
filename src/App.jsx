import { Routes,Route,Link } from 'react-router-dom'
import styles from './App.module.css'
import AboutUs from './components/AboutUs'
import { AuthProvider } from './components/context/AuthContext'
import Footer from './components/Footer'
import AuthGuard from './components/guards/AuthGuard'
import GuestGuard from './components/guards/GuestGuards'
import Header from './components/Header'
import Home from './components/Home'
import LoginDemo from './components/Login'
import Logout from './components/Logout'
import NotFound from './components/NotFound'
import PlayerCreate from './components/PlayerCreate'
import PlayerDetails from './components/PlayerDetails'
import PlayerEdit from './components/PlayerEdit'
import Players from './components/Players'
import RegisterPage from './components/RegisterPage'



function App() {

  return (
    <>
    <body className={styles.body}>
    <AuthProvider>
            <Header></Header>
            <Routes>
              <Route path={'/'} element={<Home/>}/>
              <Route path={'*'} element={<NotFound/>}/>
              <Route path={'/about'} element={<AboutUs/>}/>

            <Route element={<AuthGuard/>}>

                <Route path={'/players'} element={<Players/>}/>
                <Route path={'/players/:id'} element={<PlayerDetails/>}/>
                <Route path={'/players/create'} element={<PlayerCreate/>}/>
                <Route path={'players/edit/:id'} element={<PlayerEdit/>}/>
                <Route path={'/logout'} element={<Logout/>}/>

            </Route>
              
            <Route element={<GuestGuard/>}>

                  <Route path={'/login'} element={<LoginDemo/>}/>
                  <Route path={'/register'} element={<RegisterPage/>}/>
            </Route>
            </Routes>
    </AuthProvider>
     <Footer></Footer>
    </body>
    </>
  )
}

export default App
