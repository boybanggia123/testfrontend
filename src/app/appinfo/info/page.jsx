
"use client";
import React, { useState, useEffect } from "react";


export default function InfoPage() {
    const [user, setUser] = useState({
        fullname: "",
        phone: "",
        email: "",
        address: "",
        avatar: "",
        role: "",
        createdAt: "",
        gender: "",
        dateOfBirth: "",
      });
      const [selectedFile, setSelectedFile] = useState("");
      const [tokenValue, setTokenValue] = useState("");
      useEffect(() => {
        // Giả sử bạn đã nhận được thông tin người dùng từ API
        const updatedUser = {
          ...user,
          avatarUrl: 'http://localhost:3000/img/' + user.avatar
        };
        setUser(updatedUser);
      }, [user.avatar]);
      useEffect(() => {
        // Get token from browser cookies (client-side only)
        const token = document.cookie
          .split(";")
          .find((c) => c.trim().startsWith("token="));
        const tokenFromCookie = token?.split("=")[1];
        setTokenValue(tokenFromCookie);
    
        // Check if token exists and redirect only on the client side
        if (!tokenFromCookie) {
          // Redirect to login page if no token is found (client-side only)
          if (typeof window !== "undefined") {
            window.location.href = "/dangnhap";
          }
        } else {
          // Fetch user information using the token
          const getUser = async () => {
            const res = await fetch("http://localhost:3000/detailuser", {
              headers: {
                Authorization: `Bearer ${tokenFromCookie}`,
              },
            });
            const data = await res.json();
            setUser((prev) => ({
              ...prev,
              ...data, // Update user data from backend
            }));
          };
    
          getUser();
        }
      }, []);
    
      // Handle file change for avatar upload
      const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
          setSelectedFile(file);
          const reader = new FileReader();
          reader.onload = () => {
            setUser((prev) => ({
              ...prev,
              avatarUrl: reader.result, 
            }));
          };
          reader.readAsDataURL(file);
        }
      };
    
      // Handle user information update
      const handleUpdateUser = async (e) => {
        e.preventDefault();
      
        // Tạo form data chỉ bao gồm các trường cần thiết
        const formData = new FormData();
        formData.append("fullname", user.fullname);
        formData.append("phone", user.phone);
        formData.append("email", user.email);
        formData.append("address", user.address);
        formData.append("gender", user.gender);
        formData.append("dateOfBirth", user.dateOfBirth);
        // Kiểm tra nếu có ảnh mới được chọn
      if (selectedFile) {
        formData.append("avatar", selectedFile);
      } else {
        // Nếu không, gửi avatar hiện tại
        formData.append("avatar", user.avatar);
      }
      
        try {
          const response = await fetch("http://localhost:3000/user/update", {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${tokenValue}`,
            },
            body: formData,
          });
      
          const data = await response.json();
          if (response.ok) {
            alert("Cập nhật thông tin thành công");
            setUser((prev) => ({
              ...prev,
              avatar: data.updatedUser?.avatar || prev.avatar,
            }));
          } else {
            alert(data.message || "Có lỗi xảy ra");
          }
        } catch (error) {
          console.error("Error updating user data:", error);
          alert("Có lỗi xảy ra");
        }
      };
      
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
          ...prevUser,
          [name]: value,
        }));
      };
    
     
    
    return (
        <>
            <div className="col-5">
          <form onSubmit={handleUpdateUser}>
            <div>
              <h5 className="fw-bold">Hồ Sơ Của Tôi</h5>
              <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
              <h5>THÔNG TIN LIÊN HỆ</h5>
              <div id="form-info" className="flex-column d-flex gap-3">
                <div className="username">
                  <label htmlFor="">Tên của bạn</label> <br />
                  <input
                    type="text"
                    name="fullname"
                    value={user.fullname}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="email">
                  <label htmlFor="">Địa chỉ email</label> <br />
                  <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="phone">
                  <label htmlFor="">Số điện thoại</label> <br />
                  <input
                    type="text"
                    name="phone"
                    value={user.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="address">
                  <label htmlFor="">Địa chỉ nhận hàng</label> <br />
                  <input
                    type="text"
                    name="address"
                    value={user.address}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="gender">
                  <label htmlFor="">Giới tính</label> <br />
                  <div className="d-flex gap-2">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={user.gender === "male"}
                      onChange={handleChange}
                    />{" "}
                    Nam
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={user.gender === "female"}
                      onChange={handleChange}
                    />{" "}
                    Nữ
                    <input
                      type="radio"
                      name="gender"
                      value="other"
                      checked={user.gender === "other"}
                      onChange={handleChange}
                    />{" "}
                    Khác
                  </div>
                </div>
                <div className="birthday">
                  <label htmlFor="">Ngày sinh</label> <br />
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={user.dateOfBirth}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="save-info d-flex justify-content-between align-items-center">
                <button id="btn-save" className="btn btn-primary">
                  Lưu lại
                </button>
                <div className="reset-pass fs-6">
                  <i className="bi bi-key-fill"></i>
                  <a href="#" className="text-decoration-underline">
                    Đặt lại mật khẩu của bạn
                  </a>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div id="box-avatar" className="col-4">
                <div className="avatar-wrapper">
                  <img
                    id="avatar-img"
                    src={user.avatarUrl}
                    alt="Avatar"
                    style={{ width: "150px", height: "150px", borderRadius: "50%" }}
                  />
                  <div className="avatar-overlay">
                    <label htmlFor="avatar-input" style={{ cursor: "pointer" }}>
                      <span style={{ fontSize: "24px", color: "white" }}>+</span>
                    </label>
                  </div>
                </div>
                <input
                  type="file"
                  id="avatar-input"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
               />
            </div>
        </>
    );
  }