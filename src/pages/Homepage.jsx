import React from "react";
// import Card from "../component/Card";
// import Navbar from "../component/Navbar";
import "./Home.css"
import CourtCard from "../component/CourtCard";
import Footer from "../component/Footer";
// import { Router } from "react-router-dom";

export default function HomePage() {
    
    return (
        
        <div className="home">
            <div className="card">
                <CourtCard name="Supreme Court"
                    description="The Apex court, guardian of the Constitution."
                    logo="https://www.sci.gov.in/assets/images/logo.png" pending="75,000+"
                    disposed="1,200+"
                    disposedMonth="Jul" />
                <CourtCard name="High Courts"
                    description="Highest court of appeal in each state and UT."
                    logo="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Delhi_High_Court_Logo.svg/1200px-Delhi_High_Court_Logo.svg.png"
                    pending="5.9M+"
                    disposed="150K+"
                    disposedMonth="Jul" />
                <CourtCard name="District Courts"
                    description="The foundation of the judiciary, handling day-to-day justice."
                    logo="https://districts.ecourts.gov.in/sites/default/files/img_logo.png"
                    pending="40M+"
                    disposed="1.5M+"
                    disposedMonth="Jul" />
            </div>
            <Footer/>
        </div>


    );
}