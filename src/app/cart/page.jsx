"use client";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import {
  removeFromCart,
  updateCartItemQuantity,
  fetchCart,
} from "../../redux/slices/cartslice";
import Cookies from "js-cookie";
import axios from "axios";
import Link from "next/link";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);
import PayButton from "../components/PayButton";

export default function Cart() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { items = [] } = useSelector((state) => state.cart || {});
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = Cookies.get("token");
        if (token) {
          const response = await axios.get("http://localhost:3000/detailuser", {
            headers: { Authorization: `Bearer ${token}` },
          });
          const fetchedUserId = response.data._id;
          if (fetchedUserId) {
            setUserId(fetchedUserId);
            dispatch(fetchCart(fetchedUserId));
          }
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    fetchUserData();
  }, [dispatch]);

  const handleRemoveItem = async (item) => {
    try {
      // Xóa sản phẩm khỏi giỏ hàng
      await dispatch(
        removeFromCart({
          userId,
          productId: item.productId,
          size: item.size,
        })
      );

      // Sau khi xóa, cập nhật lại giỏ hàng từ server
      dispatch(fetchCart(userId));
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };



  return (
    <>
      <div className="container mt-2">
        <span className="cart-giohang mt-4">MY BAG </span>
        <span> ({items.length} Item)</span>

        <div className="row">
          <div className="col-lg-8 col-md-12">
            <div className="card-1 mb-4">
              {items.length > 0 ? (
                items.map((item) => (
                  <div
                    className="row"
                    key={`${item._id}-${item.productId}-${item.size}`}
                  >
                    <div className="col-4 col-sm-3 col-md-2 product-image-container">
                      <img
                        src={item.image}
                        className="img-fluid product-image"
                        alt="Product Image"
                      />
                      <div
                        className="remove-icon"
                        onClick={() => handleRemoveItem(item)}
                      >
                        <i className="fa-regular fa-trash-can"></i>
                      </div>
                    </div>

                    <div className="col-8 col-sm-9 col-md-10">
                      <Link href="#">{item.name}</Link>
                      <span className="cart_price">
                        <p className="cart_discountedPrice">
                          ${item.discountedPrice}
                        </p>
                        <del className="cart_goc">${item.price}</del>
                      </span>
                      <div className="d-flex align-items-center mb-2">
                        <select className="form-select">
                          <option>{item.size}</option>
                        </select>
                      </div>
                      <div className="d-flex justify-content-between">
                        <div className="d-flex align-items-center">
                          <button
                            className="btn btn-outline-secondary-1"
                            onClick={() => {
                              const newQuantity = Math.max(
                                1,
                                item.quantity - 1
                              );
                              dispatch(
                                updateCartItemQuantity({
                                  _id: item._id,
                                  userId,
                                  productId: item.productId,
                                  quantity: newQuantity,
                                })
                              );
                            }}
                          >
                            -
                          </button>

                          <input
                            type="number"
                            className="form-control-2"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => {
                              const newQuantity = Math.max(
                                1,
                                parseInt(e.target.value)
                              );
                              dispatch(
                                updateCartItemQuantity({
                                  _id: item._id,
                                  userId,
                                  productId: item.productId,
                                  quantity: newQuantity,
                                })
                              );
                            }}
                          />

                          <button
                            className="btn btn-outline-secondary-1"
                            onClick={() => {
                              const newQuantity = item.quantity + 1;
                              dispatch(
                                updateCartItemQuantity({
                                  _id: item._id,
                                  userId,
                                  productId: item.productId,
                                  quantity: newQuantity,
                                })
                              );
                            }}
                          >
                            +
                          </button>
                        </div>

                        <Link href="#" className="text-danger">
                          Move to Wishlist <i className="fa-solid fa-heart"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>Giỏ hàng của bạn đang trống.</p>
              )}
            </div>
            <div className="recommended-section mt-4">
              <h5>SẢN PHẨM LIÊN QUAN</h5>
              <div className="row mt-4">
                <div className="col-6 col-sm-4 col-md-3 mb-4">
                  <div className="text-center">
                    <img
                      src="img/aokhoac1.jpg"
                      className="img-fluid mb-2"
                      alt="Rec 1"
                    />
                    <p>$12.00</p>
                  </div>
                </div>
                <div className="col-6 col-md-3 mb-4">
                  <div className="text-center">
                    <img
                      src="img/aokhoac2.jpg"
                      className="img-fluid mb-2"
                      alt="Rec 2"
                    />
                    <p>$15.00</p>
                  </div>
                </div>
                <div className="col-6 col-md-3 mb-4">
                  <div className="text-center">
                    <img
                      src="img/aokhoac1.jpg"
                      className="img-fluid mb-2"
                      alt="Rec 3"
                    />
                    <p>$10.00</p>
                  </div>
                </div>
                <div className="col-6 col-md-3 mb-4">
                  <div className="text-center">
                    <img
                      src="img/aokhoac2.jpg"
                      className="img-fluid mb-2"
                      alt="Rec 4"
                    />
                    <p>$20.00</p>
                  </div>
                </div>
                <div className="col-6 col-md-3">
                  <div className="text-center">
                    <img
                      src="img/aokhoac1.jpg"
                      className="img-fluid mb-2"
                      alt="Rec 1"
                    />
                    <p>$12.00</p>
                  </div>
                </div>
                <div className="col-6 col-md-3 mb-4">
                  <div className="text-center">
                    <img
                      src="img/aokhoac2.jpg"
                      className="img-fluid mb-2"
                      alt="Rec 2"
                    />
                    <p>$15.00</p>
                  </div>
                </div>
                <div className="col-6 col-md-3 mb-4">
                  <div className="text-center">
                    <img
                      src="img/aokhoac1.jpg"
                      className="img-fluid mb-2"
                      alt="Rec 3"
                    />
                    <p>$10.00</p>
                  </div>
                </div>
                <div className="col-6 col-md-3 mb-4">
                  <div className="text-center">
                    <img
                      src="img/aokhoac2.jpg"
                      className="img-fluid mb-2"
                      alt="Rec 4"
                    />
                    <p>$20.00</p>
                  </div>
                </div>
              </div>
              <button className="btn btn-outline-secondary w-100 mb-4">
                Load More
              </button>
            </div>
          </div>
          <PayButton items={items} />
        </div>
      </div>
    </>
  );
}
