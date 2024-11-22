"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";

// Giải mã token JWT
const decodeToken = (token) => {
  if (!token) return null;
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => `%${("00" + c.charCodeAt(0).toString(16)).slice(-2)}`)
      .join("")
  );
  return JSON.parse(jsonPayload);
};

const PayButton = () => {
  const [cartItems, setCartItems] = useState([]);
  const [couponCode, setCouponCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);

  useEffect(() => {
    const token = Cookies.get("token");
  
    if (token) {
      const decoded = decodeToken(token);
      setUserId(decoded?.userId); // Lưu userId vào state
    }
  }, []);
  
  useEffect(() => {
    if (userId) {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/cart/${userId}`)
        .then((res) => {
          setCartItems(res.data); 
        })
        .catch((err) => console.error("Error fetching cart:", err));
    }
  }, [userId]);

  const applyCoupon = async () => {
   
    
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/stripe/apply-coupon`,
        { couponCode, totalAmount: 10.00 } // totalAmount in dollars
      );
  
      if (response.data.valid) {
        const discountDetails = response.data.discountDetails;
  
        setAppliedCoupon(discountDetails);
        setDiscountAmount(discountDetails.discountValue); // Giảm giá theo đô la Mỹ
        alert(`Mã giảm giá đã được áp dụng! Bạn đã giảm ${discountDetails.discountValue} USD.`);
        alert(`Tổng tiền còn lại: ${discountDetails.finalAmount} USD`);
      } else {
        setAppliedCoupon(null);
        setDiscountAmount(0);
        alert(response.data.message || "Mã giảm giá không hợp lệ.");
      }
    } catch (error) {
      console.error("Lỗi khi áp dụng mã giảm giá:", error.response?.data || error.message);
      alert("Đã xảy ra lỗi khi áp dụng mã giảm giá.");
    } finally {
      setLoading(false);
    }
  };
  
  

  const handleCheckout = async () => {
    const token = Cookies.get("token");
  
    if (!token || !cartItems || cartItems.length === 0 || !userId) {
      alert("Vui lòng kiểm tra thông tin trước khi thanh toán.");
      return;
    }
  
    setLoading(true);
  
    try {
      const decoded = decodeToken(token); // Giải mã token để lấy email
      const email = decoded?.email;
  
      const checkoutResponse = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/stripe/create-checkout-session`,
        {
          cartItems,
          userId,
          email,
          couponId: appliedCoupon?.couponId || null, // Truyền mã giảm giá (nếu có)
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      if (checkoutResponse.data.url) {
        window.location.href = checkoutResponse.data.url; // Chuyển hướng đến Stripe Checkout
      } else {
        alert("Không thể tạo phiên thanh toán.");
      }
    } catch (error) {
      console.error("Lỗi khi tạo phiên thanh toán:", error);
      alert("Đã xảy ra lỗi. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };
  

  const total = cartItems.reduce(
    (total, item) => total + item.discountedPrice * item.quantity,
    0
  );
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  
  return (
    <>
        {cartItems.length > 0 ? (
        <div className="col-lg-4 col-md-12">
          <div className="card p-3 mb-3">
            <div className="mb-3 text-center">
              <p className="text-danger mb-2">
                Nhập mã giảm giá <strong>FREECASH</strong>
              </p>
              <div className="codegiamgia input-group-2">
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="form-control mt-3"
                />
                <button
                  className="btn btn-success"
                  type="button"
                  onClick={applyCoupon}
                  disabled={loading}
                >
                  {loading ? "Đang áp dụng..." : "Apply"}
                </button>
              </div>
            </div>
            <hr />
            <ul className="list-unstyled mb-2">
              <li className="d-flex justify-content-between">
                <span>Tổng phụ</span>
                <span>
                  {subtotal.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </span>
              </li>
              <li className="d-flex justify-content-between">
                <span>Giảm giá</span>
                <span>
                  -{" "}
                  {discountAmount.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </span>
              </li>
              <li className="d-flex justify-content-between">
                <span>Vận chuyển ước tính</span>
                <span>Được tính khi thanh toán</span>
              </li>
              <li className="d-flex justify-content-between">
                <span>Thuế ước tính</span>
                <span>Được tính khi thanh toán</span>
              </li>
            </ul>
            <hr />
            <span className="d-flex justify-content-between">
              <span className="Total">Total</span>
              <span className="tongtien">
                {(total - discountAmount).toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </span>
            </span>

            <button
              className="btn btn-dark w-100 mt-3"
              onClick={handleCheckout}
              disabled={loading}
            >
              {loading ? "Đang xử lý..." : "Checkout"}
            </button>

            <div className="mt-3">
              <Link href="/" className="text-center">
                Quay về trang chủ
              </Link>
            </div>
          </div>
        </div>
      ) : null}

    </>
  );
};

export default PayButton;
