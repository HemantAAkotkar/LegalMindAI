import React from "react";
import "./Foot.css"
export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p>
          &copy; 2025 LegalMindAI. All Rights Reserved. For educational and informational purposes only.
        </p>
        <div className="footer-links">
          <a href="#">About</a>
          <a href="#">Privacy</a>
          <a href="#">Contact</a>
        </div>
      </div>
    </footer>
  );
}
