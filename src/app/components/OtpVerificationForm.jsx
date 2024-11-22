"use client";
import React, { useState } from "react";

const OtpVerificationForm = ({ onSubmit }) => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra xem OTP có hợp lệ không (chỉ chứa số và có độ dài đúng)
    if (!/^\d{6}$/.test(otp)) {
      setError("OTP phải là 6 chữ số.");
      return;
    }

    // Hiển thị trạng thái đang xử lý
    setLoading(true);
    setError(null);

    try {
      // Gọi hàm onSubmit (có thể gửi OTP lên API tại đây)
      await onSubmit(otp);
    } catch (err) {
      setError("Xác minh OTP không thành công, vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container mt-5 my-5">
    <h3 className="auth-title">Xác minh OTP</h3>
    {error && <div className="auth-alert-danger">{error}</div>}
    <form onSubmit={handleSubmit} className="auth-form mt-3">
      <div className="auth-mb-3">
        <label className="auth-form-label">Mã OTP</label>
        <input
          type="text"
          className="auth-input form-control"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Nhập mã OTP"
          required
          maxLength={6} // Giới hạn độ dài của OTP
        />
      </div>
      <button type="submit" className="auth-button btn btn-success w-100" disabled={loading}>
        {loading ? "Đang xử lý..." : "Xác minh"}
      </button>
    </form>
  </div>
  
  );
};

export default OtpVerificationForm;
