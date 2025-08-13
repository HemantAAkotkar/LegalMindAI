import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "./component/Navbar";
import Practices from "./pages/Practices";
import Resources from "./pages/Resources";
import AboutUs from "./pages/AboutUS";
import HomePage from "./pages/Homepage";
import Signin from "./pages/SignIn";
import CourtRoom from "./pages/CourtRoom";
import ProfilePage from "./pages/ProfilePage";
import "./App.css";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const hideNavbar = location.pathname === "/signin";

  // Handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/signin");
  };

  return (
    <>
      {!hideNavbar && (
        <Navbar
          isLoggedIn={isLoggedIn}
          onLogout={handleLogout}
        />
      )}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/practices" element={<Practices />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/about" element={<AboutUs />} />
        <Route
          path="/signin"
          element={<Signin onLoginSuccess={() => setIsLoggedIn(true)} />}
        />
        <Route path="/profilePage" element={<ProfilePage />} />
        
        <Route path="/courtroom" element={<CourtRoom />} />

      </Routes>
    </>
  );
}

export default App;
