import React, { useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import './ProfilePage.css'; // Import the new CSS file

// --- Mock Data ---
const initialUserProfile = {
    username: "Hemant",
    rank: "Novice Advocate",
    stats: {
        currentStreak: 12,
        longestStreak: 28,
        casesSolved: 42,
        totalPracticeDays: 58,
    },
    activityData: Array.from({ length: 182 }, () => Math.floor(Math.random() * 4)),
    skillLevels: [
        { subject: "Indian Penal Code", level: 88 },
        { subject: "Contract Act", level: 82 },
        { subject: "Law of Torts", level: 68 },
        { subject: "Constitutional Law", level: 78 },
        { subject: "Civil Procedure Code", level: 75 },
    ],
    recentCases: [
        { title: "The Misappropriated Funds", grade: "A" },
        { title: "The Flawed Agreement", grade: "B+" },
        { title: "The Negligent Driver", grade: "C" },
    ]
};

// --- Sub-Components ---

const StatCard = ({ label, value, icon }) => (
    <div className="stat-card">
        <div className="stat-icon-wrapper">{icon}</div>
        <div>
            <p className="stat-label">{label}</p>
            <p className="stat-value">{value}</p>
        </div>
    </div>
);

const ActivityGraph = ({ data }) => {
    const colors = ['level-0', 'level-1', 'level-2', 'level-3'];
    const months = ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
    return (
        <div className="card-container">
            <h3 className="card-title">Practice Activity</h3>
            <div className="graph-container">
                <div className="graph-months">
                    {months.map(month => (<div key={month} className="graph-month">{month}</div>))}
                </div>
                <div className="graph-body">
                    <div className="graph-days-labels">
                        <span></span><span>Mon</span><span></span><span>Wed</span><span></span><span>Fri</span><span></span>
                    </div>
                    <div className="activity-grid">
                        {data.map((level, index) => (<div key={index} className={`activity-day ${colors[level]}`} title={`Activity: ${level}`}></div>))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const SkillBar = ({ subject, level }) => (
    <div className="skill-bar-container">
        <div className="skill-bar-header"><span className="skill-subject">{subject}</span><span className="skill-level">{level}%</span></div>
        <div className="skill-bar-background"><div className="skill-bar-progress" style={{ width: `${level}%` }}></div></div>
    </div>
);

const EditProfileModal = ({ user, onSave, onCancel }) => {
    const [formData, setFormData] = useState({ username: user.username, rank: user.rank });
    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
    const handleSubmit = (e) => { e.preventDefault(); onSave(formData); };
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2 className="modal-title">Edit Profile</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" id="username" value={formData.username} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="rank">Rank</label>
                        <input type="text" name="rank" id="rank" value={formData.rank} onChange={handleChange} />
                    </div>
                    <div className="modal-actions">
                        <button type="button" onClick={onCancel} className="btn btn-secondary">Cancel</button>
                        <button type="submit" className="btn btn-primary">Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// --- Main Profile Page Component ---
export default function ProfilePage({ onLogout }) {
    const navigate = useNavigate();
    const [profileData, setProfileData] = useState(initialUserProfile);
    const [isEditing, setIsEditing] = useState(false);
    const [profileImage, setProfileImage] = useState(null);
    const fileInputRef = useRef(null);

    const handleSaveProfile = (updatedData) => {
        setProfileData(prev => ({ ...prev, ...updatedData }));
        setIsEditing(false);
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => setProfileImage(event.target.result);
            reader.readAsDataURL(e.target.files[0]);
        }
    };
    const logOut = (e)=>{
        navigate("/signin")
    }

    return (
        <div className="profile-page">
            {isEditing && <EditProfileModal user={profileData} onSave={handleSaveProfile} onCancel={() => setIsEditing(false)} />}
            <header className="profile-header">
                <h1 className="header-logo">LegalMind<span>AI</span></h1>
                <button onClick={logOut} className="btn logout-btn">Logout</button>
            </header>
            <main className="profile-main">
                <div className="profile-info">
                    <div className="profile-image-container">
                        <input type="file" ref={fileInputRef} onChange={handleImageChange} style={{ display: 'none' }} accept="image/*" />
                        <button onClick={() => fileInputRef.current.click()} className="profile-image-btn" title="Change Profile Photo">
                            {profileImage ? <img src={profileImage} alt="Profile" /> : profileData.username.charAt(0)}
                        </button>
                    </div>
                    <div>
                        <div className="profile-name-container">
                            <h2 className="profile-username">{profileData.username}</h2>
                            <button onClick={() => setIsEditing(true)} className="edit-profile-btn" title="Edit Profile">
                                <svg fill="currentColor" viewBox="0 0 20 20"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd"></path></svg>
                            </button>
                        </div>
                        <p className="profile-rank">{profileData.rank}</p>
                    </div>
                </div>
                <div className="stats-grid">
                    <StatCard label="Current Streak" value={`${profileData.stats.currentStreak} Days`} icon={<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.657 7.343A8 8 0 0117.657 18.657z" /></svg>} />
                    <StatCard label="Longest Streak" value={`${profileData.stats.longestStreak} Days`} icon={<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 19V5a2 2 0 012-2h10a2 2 0 012 2v14l-5-2.5L5 19z" /></svg>} />
                    <StatCard label="Cases Solved" value={profileData.stats.casesSolved} icon={<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} />
                    <StatCard label="Practice Days" value={profileData.stats.totalPracticeDays} icon={<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>} />
                </div>
                <div className="profile-content-grid">
                    <div className="main-column">
                        <ActivityGraph data={profileData.activityData} />
                    </div>
                    <div className="sidebar-column">
                        <div className="card-container">
                            <h3 className="card-title">Skill Levels</h3>
                            <div className="skills-list">
                                {profileData.skillLevels.map(skill => (<SkillBar key={skill.subject} subject={skill.subject} level={skill.level} />))}
                            </div>
                        </div>
                        <div className="card-container">
                            <h3 className="card-title">Recent Cases</h3>
                            <ul className="recent-cases-list">
                                {profileData.recentCases.map((c, i) => (
                                    <li key={i}>
                                        <p>{c.title}</p>
                                        <span className="case-grade">{c.grade}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
