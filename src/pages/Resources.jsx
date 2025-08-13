import React from 'react';
import './Resource.css';

// --- Mock Data for the page ---
const landmarkCases = [
    { name: "Kesavananda Bharati v. State of Kerala", summary: "Established the 'Basic Structure Doctrine', limiting Parliament's power to amend the Constitution.", file: "/path/to/kesavananda.pdf" },
    { name: "Maneka Gandhi v. Union of India", summary: "Vastly expanded the interpretation of 'Right to Life' under Article 21.", file: "/path/to/maneka.pdf" },
    { name: "K.M. Nanavati v. State of Maharashtra", summary: "A famous criminal case that led to the end of jury trials in India.", file: "/path/to/nanavati.pdf" },
    { name: "Vishakha v. State of Rajasthan", summary: "Established guidelines for preventing sexual harassment at the workplace (POSH).", file: "/path/to/vishakha.pdf" },
    { name: "Mohd. Ahmed Khan v. Shah Bano Begum", summary: "A landmark case on maintenance rights for divorced Muslim women.", file: "/path/to/shahbano.pdf" },
    { name: "Indra Sawhney v. Union of India", summary: "Upheld the Mandal Commission's recommendations on reservations for OBCs.", file: "/path/to/indrasawhney.pdf" },
    { name: "S.R. Bommai v. Union of India", summary: "Curtailed the arbitrary dismissal of state governments under Article 356.", file: "/path/to/srbommai.pdf" },
    { name: "Navtej Singh Johar v. Union of India", summary: "Decriminalized homosexuality by striking down parts of Section 377 of the IPC.", file: "/path/to/navtej.pdf" },
    { name: "Justice K.S. Puttaswamy (Retd.) v. UOI", summary: "Affirmed the Right to Privacy as a fundamental right under the Constitution.", file: "/path/to/puttaswamy.pdf" },
    { name: "Shreya Singhal v. Union of India", summary: "Struck down Section 66A of the IT Act, protecting online freedom of speech.", file: "/path/to/shreyasinghal.pdf" }
];

// --- Sub-Components ---
const FeatureCard = ({ icon, title, description }) => (
    <div className="feature-card">
        <div className="feature-icon">
            {icon}
        </div>
        <h3 className="feature-title">{title}</h3>
        <p className="feature-desc">{description}</p>
    </div>
);

const CaseListItem = ({ caseItem }) => (
    <li className="case-item">
        <div className="case-text">
            <h4 className="case-title">{caseItem.name}</h4>
            <p className="case-summary">{caseItem.summary}</p>
        </div>
        <a href={caseItem.file} download className="download-btn">
            <svg className="download-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download PDF
        </a>
    </li>
);

// --- Main Resource Page Component ---
export default function Resources({ onNavigate = () => {} }) {
    return (
        <div className="resource-container">
            {/* <header className="header">
                <h1 className="logo">LegalMind<span className="highlight">AI</span></h1>
            </header> */}

            <main className="main-content">
                <div className="intro">
                    <h2 className="intro-title">Your Legal Learning Toolkit</h2>
                    <p className="intro-desc">Essential resources to sharpen your skills and deepen your knowledge.</p>
                </div>

                {/* Features Section */}
                <section className="features-section">
                    <h3 className="section-title">Interactive Mock Tests</h3>
                    <div className="features-grid">
                        <FeatureCard 
                            title="Verbal (Voice) Tests"
                            description="Simulate a real courtroom by presenting your arguments out loud. Our AI transcribes and analyzes your speech."
                            icon={<svg className="icon-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                            </svg>}
                        />
                        <FeatureCard 
                            title="Text-Based Tests"
                            description="Perfect your legal writing and structure your arguments with precision in our classic text-based simulation."
                            icon={<svg className="icon-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>}
                        />
                    </div>
                    <div className="btn-center">
                        <button onClick={() => onNavigate('courtroom')} className="start-btn">
                            Start a Practice Session
                        </button>
                    </div>
                </section>

                {/* Case Studies Section */}
                <section>
                    <h3 className="section-title">Top 10 Landmark Case Studies</h3>
                    <div className="cases-list">
                        <ul>
                            {landmarkCases.map(caseItem => (
                                <CaseListItem key={caseItem.name} caseItem={caseItem} />
                            ))}
                        </ul>
                    </div>
                </section>
            </main>
        </div>
    );
}
