"use client"

import React, { useState } from "react";

const PasswordResetForm = ({ onSubmit }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Thêm state cho xác nhận mật khẩu
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Kiểm tra mật khẩu mới và mật khẩu xác nhận có giống nhau không
    if (newPassword !== confirmPassword) {
      setErrorMessage("Mật khẩu xác nhận không khớp với mật khẩu mới.");
      return;
    }

    setErrorMessage(""); // Nếu mật khẩu khớp, xóa thông báo lỗi
    onSubmit(newPassword); // Gửi mật khẩu mới
  };

  return (
    <div className="auth-container mt-5 my-5">
      <h3 className="auth-title">Đặt lại mật khẩu</h3>
      <form onSubmit={handleSubmit} className="auth-form mt-3">
        <div className="auth-mb-3">
          <label className="auth-form-label">Mật khẩu mới</label>
          <input
            type="password"
            className="auth-input form-control"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Nhập mật khẩu mới"
            required
          />
        </div>

        <div className="auth-mb-3">
          <label className="auth-form-label">Xác nhận mật khẩu mới</label>
          <input
            type="password"
            className="auth-input form-control"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Nhập lại mật khẩu mới"
            required
          />
        </div>

        {errorMessage && <p className="text-danger">{errorMessage}</p>}

        <button type="submit" className=" auth-button btn btn-warning w-100">
          Đặt lại mật khẩu
        </button>
      </form>
    </div>
  );
};

export default PasswordResetForm;
