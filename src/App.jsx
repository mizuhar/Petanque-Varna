import { Routes, Route } from "react-router-dom";

import { AuthProvider } from "./components/context/AuthContext";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./components/Home";
import AboutUs from "./components/AboutUs";
import AdminLogin from "./components/AdminLogin";
import NotFound from "./components/NotFound";
import Logout from "./components/Logout";

// ✅ New Public Pages
import Tournaments from "./components/Tournaments";
import News from "./components/News";
import Gallery from "./components/Gallery";

// ✅ Admin

import AdminDashboard from "./components/admin/AdminDashboard";
import AdminGuard from "./components/guards/AdminGuard";
import AdminNews from "./components/admin/AdminNews";

// ✅ Admin CRUD (ако още ги ползваме)
import Players from "./components/Players";
import PlayerDetails from "./components/PlayerDetails";
import PlayerCreate from "./components/PlayerCreate";
import PlayerEdit from "./components/PlayerEdit";
import AdminGallery from "./components/admin/AdminGallery";
import AdminPlayers from "./components/admin/AdminPlayers";

function App() {
  return (
    <AuthProvider>
      <div className="page">
        <Header />

        <Routes>
          {/* 🌍 Public */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/tournaments" element={<Tournaments />} />
          <Route path="/news" element={<News />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/login" element={<AdminLogin />} />

          {/* 🔐 Admin Only */}
          <Route element={<AdminGuard />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/news" element={<AdminNews />} />
            <Route path="/admin/gallery" element={<AdminGallery />} />
           <Route path="/admin/players" element={<AdminPlayers />} />
            {/* Admin CRUD */}
            <Route path="/players" element={<Players />} />
            <Route path="/players/:id" element={<PlayerDetails />} />
            <Route path="/players/create" element={<PlayerCreate />} />
            <Route path="/players/edit/:id" element={<PlayerEdit />} />

            <Route path="/logout" element={<Logout />} />
          </Route>

          {/* 🚫 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      <Footer />
    </AuthProvider>
  );
}

export default App;
