import React from "react";
// import Card from "../component/Card";
// import Navbar from "../component/Navbar";
import "./Home.css"
import CourtCard from "../component/CourtCard";
import Footer from "../component/Footer";
// import { Router } from "react-router-dom";

export default function HomePage() {
    const FeatureCard = ({ title, description }) => (
  <div className="feature-card">
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

    return (

        <div className="home">
            <section className="hero">
                <h1>From Classroom Theory to <span className="highlight">Courtroom Confidence</span></h1>
                <p>LegalMindAI is a virtual training ground for law students. Tackle unlimited, AI-generated case studies to master legal analysis and become practice-ready.</p>
                <button>Start Your First Case</button>
            </section>
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
            <section className="features">
                <h2>A Curriculum for the Modern Lawyer</h2>
                <div className="feature-cards">
                    <FeatureCard title="Indian Penal Code, 1860" description="Practice scenarios on theft, culpable homicide, cheating, and more." />
                    <FeatureCard title="Indian Contract Act, 1872" description="Analyze problems of offer, acceptance, breach of contract, and remedies." />
                    <FeatureCard title="Law of Torts" description="Tackle cases of negligence, nuisance, defamation, and vicarious liability." />
                </div>
            </section>
            <Footer />
        </div>


    );
}