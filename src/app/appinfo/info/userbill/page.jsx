"use client";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie"; // Import the js-cookie librar
import ClientModal from "../../../components/modalinfo";


export default function InfoBillModern() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState("");
  const [userId, setUserId] = useState("");
 
 
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      setUserId(decodedToken.userId);
    }
    
  }, []);

  useEffect(() => {
    if (userId) {
      const fetchOrders = async () => {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/stripe/orderuser/${userId}`);
          const data = await response.json();
          setOrders(data);
        } catch (error) {
          console.error("Error fetching orders:", error);
        }
      };

      fetchOrders();
    }
  }, [userId]);

  const handleOrderClick = async (orderId) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/stripe/orders/${orderId}`);
      const data = await response.json();
      setSelectedOrder(data);
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };

  return (
    <div className="col-9">
      <div className="container mt-3">
        <h2 className="text-primary">Thông tin mua hàng</h2>
        <table className="table table-hover shadow p-3 mb-5 bg-body rounded mt-4">
          <thead className="table-light ">
            <tr>
              <th>Tên thanh toán</th>
              <th>Email</th>
              <th>Địa chỉ</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(orders) && orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order._id}>
                  <td>{order.shipping.name}</td>
                  <td>{order.shipping.email}</td>
                  <td>
                    {order.shipping.address.line1}, {order.shipping.address.city}
                  </td>
                  <td>
                    <button
                      className="btn btn-info btn-sm"
                      data-bs-toggle="modal"
                      data-bs-target="#orderDetailsModal"
                      onClick={() => handleOrderClick(order._id)}
                    >
                      Xem chi tiết
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  Không có đơn hàng nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for Order Details */}
      <ClientModal selectedOrder={selectedOrder} modalId="orderDetailsModal" />
      
    </div>
  );
}
