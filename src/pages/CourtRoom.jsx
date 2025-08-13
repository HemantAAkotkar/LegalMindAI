import React, { useState, useEffect } from 'react';
import './CourtRoom.css';

export default function CourtRoom() {
  const [turn, setTurn] = useState('user'); // 'user', 'opponent', 'judge'
  const [userScore, setUserScore] = useState(0);
  const [userArgument, setUserArgument] = useState('');
  const [opponentArgument, setOpponentArgument] = useState('...');
  const [judgeRuling, setJudgeRuling] = useState('The court is in session. Plaintiff, you may begin.');

  const opponentResponses = [
    "Objection, Your Honor. Counsel's argument is based on hearsay.",
    "That's a misinterpretation of the precedent set in Sharma v. Singh.",
    "My client acted with reasonable care, the liability lies elsewhere.",
    "Counsel is leading the witness, Your Honor."
  ];

  const handleUserSubmit = (e) => {
    e.preventDefault();
    const userInput = e.target.elements.user_input.value;
    if (!userInput || turn !== 'user') return;

    setUserArgument(userInput);
    setJudgeRuling("The court is considering the plaintiff's argument...");
    setTurn('opponent');
  };

  useEffect(() => {
    if (turn === 'opponent') {
      const timeout = setTimeout(() => {
        const response = opponentResponses[Math.floor(Math.random() * opponentResponses.length)];
        setOpponentArgument(response);
        setJudgeRuling("The court has heard the defense. Analyzing arguments...");
        setTurn('judge');
      }, 2000);
      return () => clearTimeout(timeout);
    }

    if (turn === 'judge') {
      const timeout = setTimeout(() => {
        const isValid = Math.random() > 0.3;
        if (isValid) {
          setJudgeRuling("Point to the Plaintiff. The argument is sound.");
          setUserScore(prev => prev + 10);
        } else {
          setJudgeRuling("Objection sustained. Rephrase, counsel.");
        }
        setUserArgument('');
        setTurn('user');
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [turn]);

  return (
    <div className="courtroom">
      <header>
        <h1>LegalMind<span className="highlight">AI</span></h1>
        <p>Courtroom Simulation: The ABC Case</p>
      </header>

      <div className="judge-bench">
        <h2>The Hon'ble AI Judge</h2>
        <p>"{judgeRuling}"</p>
      </div>

      <div className="panels">
        <div className={`panel user-panel ${turn === 'user' ? 'active' : ''}`}>
          <div className="panel-header">
            <h3>Case Lawyer (You)</h3>
            <div className="score">
              <span>SCORE</span>
              <strong>{userScore}</strong>
            </div>
          </div>
          <div className="panel-body">
            {userArgument || "Awaiting your argument..."}
          </div>
          <form onSubmit={handleUserSubmit}>
            <input
              type="text"
              name="user_input"
              placeholder={turn === 'user' ? "Your argument..." : "Waiting for opponent..."}
              disabled={turn !== 'user'}
            />
            <button type="submit" disabled={turn !== 'user'}>Send</button>
          </form>
        </div>

        <div className={`panel opponent-panel ${turn === 'opponent' ? 'active' : ''}`}>
          <div className="panel-header">
            <h3>Opponent Lawyer (AI)</h3>
          </div>
          <div className="panel-body">
            {turn === 'opponent' ? "Thinking..." : opponentArgument}
          </div>
          <input type="text" disabled placeholder="Opponent's argument..." />
          <button disabled>Send</button>
        </div>
      </div>
    </div>
  );
}
