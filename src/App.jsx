import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./component/Navbar";
import Practices from "./pages/Practices";
import Resources from "./pages/Resources";
import AboutUs from "./pages/AboutUS";
import HomePage from "./pages/Homepage";
import Signin from "./pages/SignIn";
import CourtRoom from "./pages/CourtRoom"
import ProfilePage from "./pages/ProfilePage";
import "./App.css";

function App() {
  const location = useLocation();

  // Hide Navbar on SignIn page
  const hideNavbar = location.pathname === "/signin";
  const hideNav = location.pathname ==="/profilePage"

  return (
    <>
      {!hideNavbar && <Navbar />}
      

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/practices" element={<Practices />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/profilePage" element={<ProfilePage />} />
      </Routes>
    </>
  );
}

export default App;
