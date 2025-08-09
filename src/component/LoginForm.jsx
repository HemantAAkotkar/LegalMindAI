import React from "react";
import "./Login.css";

export default function LoginForm({ onSubmit, toggleView }) {
  return (
    <>
      <h2 className="form-title">Welcome Back</h2>
      <p className="form-subtitle">Sign in to continue your practice.</p>
      <form onSubmit={onSubmit} className="form">
        <div className="form-group">
          <label htmlFor="username-login" className="form-label">
            Username
          </label>
          <input
            type="text"
            name="username-login"
            id="username-login"
            required
            className="form-input"
            placeholder="your_username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password-login" className="form-label">
            Password
          </label>
          <input
            type="password"
            name="password-login"
            id="password-login"
            required
            className="form-input"
            placeholder="••••••••"
          />
        </div>
        <div>
          <button type="submit" className="btn-submit">
            Sign In
          </button>
        </div>
      </form>
      <p className="toggle-text">
        Don't have an account?
        <button onClick={toggleView} className="toggle-btn">
          Sign Up
        </button>
      </p>
    </>
  );
}
