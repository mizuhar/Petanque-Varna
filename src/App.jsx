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
import AdminGallery from "./components/admin/AdminGallery";
import AdminPlayers from "./components/admin/AdminPlayers";
import AdminTournaments from "./components/admin/AdminTournaments";
import Contact from "./components/Contact";

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
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<AdminLogin />} />
            <Route path="/players" element={<Players />} />

          {/* 🔐 Admin Only */}
          <Route element={<AdminGuard />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/news" element={<AdminNews />} />
            <Route path="/admin/gallery" element={<AdminGallery />} />
           <Route path="/admin/players" element={<AdminPlayers />} />
           <Route path="/admin/tournaments" element={<AdminTournaments />} />
           

          </Route>
            <Route path="/logout" element={<Logout />} />

          {/* 🚫 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>

      <Footer />
    </AuthProvider>
  );
}

export default App;
