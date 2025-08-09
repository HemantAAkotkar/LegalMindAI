import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import { assets } from '../assets/assets';
import "./Nav.css"
function Navbar() {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate("/signin");
  };

  return (
    
    <nav className="navbar">
        <div className="logo">
            <img src={assets.logo} alt="" />
            <h2>LegalMind<span className='highlight'>AI</span></h2>
        </div>
        <div className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/practices">Practices</Link></li>
          <li><Link to="/resources">Resources</Link></li>
          <li><Link to="/about">About Us</Link></li>
        </div>
        <div className="search">
          <img src={assets.search_icon} alt="" />
          <input type="search" className="hi" id="" placeholder='Search .....' style={{ textAlign: "center",border:"none" }}/>
        </div>
        <button className="btn" onClick={handleSignIn}>Sign In</button>
    </nav>
  )
}

export default Navbar;
