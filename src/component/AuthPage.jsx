import React, { useState } from "react";
import "./AuthPage.css";
import { useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

export default function AuthPage() {
  const [isLoginView, setIsLoginView] = useState(true);
  const navigate = useNavigate();

  const toggleView = () => setIsLoginView(!isLoginView);

  const handleSignUp = (event) => {
    event.preventDefault();
    const username = event.target.elements["username-signup"].value;
    const password = event.target.elements["password-signup"].value;
    const confirmPassword = event.target.elements["confirm-password-signup"].value;

    if (!username || !password || !confirmPassword) {
      alert("Please fill all fields.");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const credentials = { username, password };
    localStorage.setItem("userCredentials", JSON.stringify(credentials));
    alert("Sign up successful! Please log in.");
    setIsLoginView(true);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    const username = event.target.elements["username-login"].value;
    const password = event.target.elements["password-login"].value;

    if (!username || !password) {
      alert("Please enter both username and password.");
      return;
    }

    const storedCredentialsJSON = localStorage.getItem("userCredentials");
    if (!storedCredentialsJSON) {
      alert("No user found. Please sign up first.");
      return;
    }

    const storedCredentials = JSON.parse(storedCredentialsJSON);
    if (
      username === storedCredentials.username &&
      password === storedCredentials.password
    ) {
      navigate("/profilePage");// redirect after login success
    } else {
      alert("Invalid username or password.");
    }
  };

  return (
    <div className="authpage-container">
      <div className="authpage-wrapper">
        <div className="authpage-logo">
          <a href="#" className="logo-text">
            LegalMind<span className="logo-highlight">AI</span>
          </a>
        </div>
        <div className="authpage-card">
          {isLoginView ? (
            <LoginForm onSubmit={handleLogin} toggleView={toggleView} />
          ) : (
            <SignUpForm onSubmit={handleSignUp} toggleView={toggleView} />
          )}
        </div>
      </div>
    </div>
  );
}
