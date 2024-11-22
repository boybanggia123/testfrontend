"use client"

import React, { useState } from "react";

const EmailInputForm = ({ onSubmit }) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(email);
  };

  return (
    <div className="auth-container mt-5 my-5 ">
  <h3 className="auth-title">Nhập Email</h3>
  <form onSubmit={handleSubmit} className="auth-form mt-3">
    <div className="auth-mb-3">
      <label className="auth-form-label">Email</label>
      <input
        type="email"
        className="auth-input form-control"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Nhập email của bạn"
        required
      />
    </div>
    <button type="submit" className="auth-button btn btn-primary w-100 ">
      Gửi OTP
    </button>
  </form>
</div>
  );
};

export default EmailInputForm;
