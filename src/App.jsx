import { Routes,Route,Link } from 'react-router-dom'
import AboutUs from './components/AboutUs'
import { AuthProvider } from './components/context/AuthContext'
import Footer from './components/Footer'
import Header from './components/Header'
import Home from './components/Home'
import Logout from './components/Logout'
import NotFound from './components/NotFound'
import PlayerCreate from './components/PlayerCreate'
import PlayerDetails from './components/PlayerDetails'
import PlayerEdit from './components/PlayerEdit'
import Players from './components/Players'
import AdminLogin from './components/AdminLogin'
import AdminDashboard from './components/admin/AdminDashboard'
import AdminGuard from './components/guards/AdminGuard'



function App() {

  return (
  
 <>
            
    <AuthProvider>
      <div className="page">
            <Header/>
            <Routes>

  {/* Public */}
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<AboutUs />} />
  <Route path="/login" element={<AdminLogin />} />

  {/* Admin Only */}
  <Route element={<AdminGuard />}>
      <Route path="/admin" element={<AdminDashboard />} />

      <Route path="/players" element={<Players />} />
      <Route path="/players/:id" element={<PlayerDetails />} />
      <Route path="/players/create" element={<PlayerCreate />} />
      <Route path="/players/edit/:id" element={<PlayerEdit />} />
      <Route path="/logout" element={<Logout />} />
  </Route>

  {/* 404 */}
  <Route path="*" element={<NotFound />} />

</Routes>
</div>
            <Footer></Footer>
         
    </AuthProvider>
           
   
            </>
  )
}

export default App
