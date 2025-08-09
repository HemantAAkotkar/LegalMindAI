import React from "react";
import "./SignUp.css";

export default function SignUpForm({ onSubmit, toggleView }) {
  return (
    <>
      <h2 className="signup-title">Create Account</h2>
      <p className="signup-subtitle">
        Start your journey to becoming practice-ready.
      </p>

      <form onSubmit={onSubmit} className="signup-form">
        <div className="form-group">
          <label htmlFor="username-signup">Username</label>
          <input
            type="text"
            name="username-signup"
            id="username-signup"
            required
            placeholder="choose_a_username"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password-signup">Password</label>
          <input
            type="password"
            name="password-signup"
            id="password-signup"
            required
            placeholder="Create a strong password"
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirm-password-signup">Confirm Password</label>
          <input
            type="password"
            name="confirm-password-signup"
            id="confirm-password-signup"
            required
            placeholder="Re-enter your password"
          />
        </div>

        <div className="form-group">
          <button type="submit" className="signup-btn">Sign Up</button>
        </div>
      </form>

      <p className="signup-footer">
        Already have an account?
        <button onClick={toggleView} className="signin-link">
          Sign In
        </button>
      </p>
    </>
  );
}
