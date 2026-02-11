import React from "react";
import "./About.css";
import { useNavigate } from 'react-router-dom';

// --- Sub-Component for the Team Member Card ---
const TeamMemberCard = ({ name, role, imageUrl, initials }) => (
  <div className="team-member">
    <img
      className="team-image"
      src={imageUrl}
      alt={name}
      onError={(e) => {
        e.target.onerror = null;
        const canvas = document.createElement("canvas");
        canvas.width = 128;
        canvas.height = 128;
        const context = canvas.getContext("2d");
        context.fillStyle = "#38bdf8"; // sky-500
        context.fillRect(0, 0, 128, 128);
        context.fillStyle = "#FFFFFF";
        context.font = "bold 48px Inter, sans-serif";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillText(initials, 64, 64);
        e.target.src = canvas.toDataURL();
      }}
    />
    <h4 className="team-name">{name}</h4>
    <p className="team-role">{role}</p>
  </div>
);

// --- Main About Page Component ---
export default function AboutUS({ onNavigate }) {
    const navigate = useNavigate(); // 2. Initialize the navigate function

  const handleNavigateToCourtroom = () => {
    navigate('/courtroom'); // 3. Call navigate with the desired path
  };

  return (

    <div className="about-page">
      {/* Header */}
      {/* <header className="about-header">
        <h1 className="logo">
          LegalMind<span className="logo-highlight">AI</span>
        </h1>
      </header> */}

      {/* Main Content */}
      <main className="about-main">
        <div className="about-container">
          {/* Mission Section */}
          <section className="mission-section">
            <h2 className="mission-title">
              Bridging the Gap Between <span>Theory & Practice</span>
            </h2>
            <p className="mission-text">
              Our mission is to empower every law student with the practical
              skills and confidence needed to excel in the courtroom from day
              one.
            </p>
          </section>

          {/* Solution Section */}
          <section className="solution-section">
            <h3 className="section-title">Our Solution</h3>
            <p>
              LegalMindAI is a virtual training ground designed to solve a
              critical challenge in legal education. By leveraging a powerful
              generative AI, we provide an on-demand, interactive platform where
              students can tackle an infinite number of unique case studies. Our
              courtroom simulation forces students to think on their feet,
              formulate arguments, and respond to challenges, building the
              mental muscle required for a successful legal practice.
            </p>
          </section>

          {/* Team Section */}
          <section className="team-section">
            <h2 className="section-title">The Founders</h2>
            <div className="team-grid">
              <TeamMemberCard
                name="Hemant Akotkar"
                role="Founder & Visionary"
                imageUrl="https://placehold.co/128x128/38bdf8/FFFFFF?text=HA"
                initials="HA"
              />
              
            </div>
          </section>

          {/* Call to Action */}
          <section className="cta-section">
            <h3 className="section-title">Ready to Become Practice-Ready?</h3>
            <button
        onClick={handleNavigateToCourtroom} // 4. Use the new handler function
        className="cta-button"
      >
        Start Your First Case
      </button>
          </section>
        </div>
      </main>
    </div>
  );
}
