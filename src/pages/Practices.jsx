import React, { useState, useEffect, useRef } from 'react';
import './Practice.css'; // Import the new CSS file

// --- TestCasePage Component ---
const TestCasePage = ({ username, currentCase, testMode, onEndSession }) => {
    const [transcript, setTranscript] = useState([]);
    const [isOpponentTyping, setIsOpponentTyping] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [showVerdict, setShowVerdict] = useState(false);
    const transcriptEndRef = useRef(null);

    if (!currentCase) {
        return <div className="loading-container"><p>Loading Case...</p></div>;
    }

    useEffect(() => {
        setTranscript([
            {
                speaker: 'AI Judge',
                text: `The court is now in session for the case of "${currentCase.title}". Counsel for the ${currentCase.yourRole}, you may begin with your opening statement.`
            }
        ]);
    }, [currentCase]);

    const scrollToBottom = () => transcriptEndRef.current?.scrollIntoView({ behavior: "smooth" });
    useEffect(scrollToBottom, [transcript]);

    // ... (rest of the logic for speech recognition and submitting arguments would go here)

    return (
        <div className="simulation-container">
            <div className="simulation-grid">
                <div className="panel case-details-panel">
                    <h2 className="panel-title">Case Details</h2>
                    <div className="panel-content">
                        <h3 className="case-detail-subtitle">Your Role:</h3>
                        <p className="case-detail-text">{currentCase.yourRole}</p>
                        <h3 className="case-detail-subtitle">Facts:</h3>
                        <p className="case-detail-text">{currentCase.facts}</p>
                    </div>
                </div>
                <div className="panel transcript-panel">
                    <h2 className="panel-title">Court Transcript</h2>
                    <div className="transcript-content">
                        {transcript.map((entry, index) => (
                            <div key={index} className={`bubble ${entry.speaker === 'You' ? 'bubble-user' :
                                entry.speaker === 'Opponent Lawyer' ? 'bubble-opponent' :
                                    'bubble-judge'
                                }`}>
                                <p className="bubble-speaker">{entry.speaker}</p>
                                <p className="bubble-text">{entry.text}</p>
                            </div>
                        ))}
                        <div ref={transcriptEndRef} />
                    </div>
                </div>
                <div className="panel action-panel">
                    <h2 className="panel-title">Your Action</h2>
                    <div className="action-panel-content">
                        {/* InputComponent would be rendered here based on testMode */}
                        <div className="input-placeholder">
                            {testMode === 'verbal' ? "Verbal input controls would be here." : "Text input field would be here."}
                        </div>
                        <div className="verdict-button-container">
                            <button onClick={() => setShowVerdict(true)} className="btn btn-verdict">
                                Conclude & Request Verdict
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {showVerdict && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2 className="modal-title">Session Complete!</h2>
                        <div className="grade-container">
                            <p className="grade-label">Your Grade</p>
                            <p className="grade-value">A-</p>
                        </div>
                        <div className="modal-actions">
                            <button onClick={onEndSession} className="btn btn-primary">Back to Case Selection</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// --- Main CourtRoom Page Component ---
export default function Practices({ username, onLogout }) {
    const [view, setView] = useState('caseSelection');
    const [cases, setCases] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCaseId, setActiveCaseId] = useState(null);
    const [currentCase, setCurrentCase] = useState(null);
    const [testMode, setTestMode] = useState(null);

    const generateCases = async () => {
        setIsLoading(true);
        setError(null);
        setActiveCaseId(null);
        // This is a mock API call for demonstration
        setTimeout(() => {
            setCases([
                { id: 1, title: "Theft by Trick", description: "Distinguish between theft and deception.", subject: "Indian Penal Code", difficulty: "Easy", facts: "A valuable item was taken...", yourRole: "Prosecution Counsel" },
                { id: 2, title: "The Unpaid Invoice Dispute", description: "Is the supplier entitled to interest on delayed payment?", subject: "Contract Act", difficulty: "Easy", facts: "A supplier delivered goods on time, but the buyer delayed payment by 4 months without justification.", yourRole: "Supplier's Counsel" },
                {id: 3,title: "The Late Rent Payment",description: "Is the tenant liable for a penalty?",subject: "Transfer of Property Act",difficulty: "Easy",facts: "A tenant paid rent 10 days late due to a bank strike, and the landlord charged a fixed late penalty mentioned in the lease agreement.",yourRole: "Tenant's Counsel"  },

                { id: 4, title: "The Ambiguous Email Offer", description: "Was a valid contract formed?", subject: "Contract Act", difficulty: "Medium", facts: "An email was sent...", yourRole: "Plaintiff's Counsel" },
                { id: 5, title: "The Vanishing Witness", description: "Does the absence of a key witness weaken the prosecution?", subject: "Indian Evidence Act", difficulty: "Medium", facts: "In a theft case, the only eyewitness moved abroad before trial and could not be cross-examined.", yourRole: "Defense Counsel" },
                { id: 6, title: "The Altered Will", description: "Was the will forged or altered after signing?", subject: "Indian Succession Act", difficulty: "Medium", facts: "An elderly man’s will left property to his nephew, but a later version with a higher bequest to a neighbor surfaced after his death.", yourRole: "Nephew's Counsel" },
                { id: 7, title: "The Collapsing Balcony", description: "Analyze the chain of negligence.", subject: "Law of Torts", difficulty: "Hard", facts: "A balcony collapsed...", yourRole: "Plaintiff's Counsel" },

                { id: 8, title: "The Misplaced Trust Fund", description: "Did the trustee misuse the funds?", subject: "Indian Trusts Act", difficulty: "Hard", facts: "A trustee invested trust funds in a personal business without informing the beneficiaries, later claiming it was for their benefit.", yourRole: "Beneficiary's Counsel" },
                {
                    id:9, title: "The Poisoned Well", description: "Is the factory owner liable for environmental damage?", subject: "Environmental Protection Act", difficulty: "Hard", facts: "A factory's waste disposal methods contaminated a village’s groundwater, causing widespread illness.", yourRole: "Plaintiff's Counsel"
                },
            ]);
            setIsLoading(false);
        }, 1500);
    };

    useEffect(() => {
        generateCases();
    }, []);

    const handleStartSession = (caseItem, mode) => {
        setCurrentCase(caseItem);
        setTestMode(mode);
        setView('simulation');
    };

    const handleEndSession = () => {
        setView('caseSelection');
    };

    const filteredCases = cases.filter(c =>
        c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (view === 'simulation') {
        return (
            <TestCasePage
                username={username}
                currentCase={currentCase}
                testMode={testMode}
                onEndSession={handleEndSession}
            />
        );
    }

    return (
        <div className="page-container">
            {/* <header className="page-header">
                <div>
                    <h1 className="header-logo">LegalMind<span>AI</span></h1>
                    <p className="header-welcome">Welcome, {username}</p>
                </div>
                <button onClick={onLogout} className="btn btn-logout">Logout</button>
            </header> */}
            <main className="main-content">
                <div className="selection-header">
                    <div>
                        <h1 className="page-title">Select a Case</h1>
                        <p className="page-subtitle">Choose a scenario to begin your mock trial.</p>
                    </div>
                    <button onClick={generateCases} disabled={isLoading} className="btn btn-refresh">
                        {isLoading ? 'Refreshing...' : 'Refresh Cases'}
                    </button>
                </div>
                <div className="search-bar-container">
                    <input
                        type="text"
                        placeholder="Search for a case by keyword (e.g., 'negligence')"
                        className="search-input"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                {isLoading && <p className="loading-text">Generating fresh case studies with AI...</p>}
                {error && <p className="error-text">{error}</p>}
                {!isLoading && !error && (
                    <div className="case-grid">
                        {filteredCases.map(caseItem => (
                            <div key={caseItem.id} className="case-card">
                                <div>
                                    <div className="case-card-header">
                                        <h4 className="case-title">{caseItem.title}</h4>
                                        <span className={`difficulty-badge difficulty-${caseItem.difficulty.toLowerCase()}`}>{caseItem.difficulty}</span>
                                    </div>
                                    <p className="case-description">{caseItem.description}</p>
                                    <p className="case-subject">Subject: {caseItem.subject}</p>
                                </div>
                                {activeCaseId === caseItem.id ? (
                                    <div className="mode-selection-container">
                                        <p>Choose your test mode:</p>
                                        <div className="mode-buttons">
                                            <button onClick={() => handleStartSession(caseItem, 'verbal')} className="btn btn-verbal">Verbal Test</button>
                                            <button onClick={() => handleStartSession(caseItem, 'text')} className="btn btn-text">Text Test</button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="select-button-container">
                                        <button onClick={() => setActiveCaseId(caseItem.id)} className="btn btn-select">Select this Case</button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
