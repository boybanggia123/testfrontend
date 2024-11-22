"use client";
import React, { useState, useEffect } from "react"; 
import Link from "next/link";




export default function Info({ user, handleUpdateUser, handleChange, handleFileChange,children }) {
  

  const handleLogout = () => {
    
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "/";  // Redirect after logout
    
  };
  return (
    <div className="container mt-5 my-5">
      <div className="row">
        <div className="col-3">
          <Link href="/" id="back-home" className="fw-bold d-flex gap-1">
            <i className="bi bi-arrow-left"></i>
            <span>Quay lại trang chủ</span>
          </Link>
          <ul id="list-nav-info" className="nav flex-column gap-3">
            <li className="fw-bold d-flex gap-1">
              <i className="bi bi-pencil-square"></i>
              <Link href='/info'></Link>
              <span>Thông tin của tôi</span>
            </li>
            <li className="fw-bold d-flex gap-1">
              <i className="bi bi-receipt-cutoff"></i>
              <Link href="info/userbill">
              <span>Đơn hàng của tôi</span>
              </Link>
             
            </li>
            <li className="fw-bold d-flex gap-1">
              <i className="bi bi-bell-fill"></i>
              <span>Thông báo</span>
            </li>
            <li className="fw-bold d-flex gap-1">
              <i className="bi bi-telephone-fill"></i>
              <span>Trung tâm trợ giúp</span>
            </li>
          </ul>
          <div id="log-out" className="d-flex gap-1 text-danger fw-bold">
            <i className="bi bi-box-arrow-right"></i>
            <button onClick={handleLogout} className="btn btn-link">
              Đăng xuất
            </button>
          </div>
        </div>
  
        {children}
        


      </div>
    </div>
  );
}
