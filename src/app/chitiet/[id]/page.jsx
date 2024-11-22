"use client";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "@/redux/slices/cartslice";
import { useState, useEffect } from "react";
import Link from "next/link";
import useSWR from "swr";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter,useParams } from "next/navigation";
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Detail({ params }) {
  const { id } = useParams();
  const [rating, setRating] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [notification, setNotification] = useState("");
  const [userComments, setUserComments] = useState([]);
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const cart = useSelector((state) => state.cart);
  console.log(cart);
  const router = useRouter();
  const handleStarClick = (star) => {
    // Nếu nhấn vào số sao đã chọn thì bỏ chọn, nếu không thì chọn sao mới
    setRating(rating === star ? 0 : star);
  };
  const {
    data: product,
    error,
    isLoading,
  } = useSWR(
    id ? `${process.env.NEXT_PUBLIC_API_URL}/productdetail/${id}` : null,
    fetcher,
    {
      refreshInterval: 6000,
    }
  );
  useEffect(() => {
    if (product) {
      // Lấy danh sách bình luận của sản phẩm khi có dữ liệu sản phẩm
      setUserComments(product.reviews || []);
    }
  }, [product]);
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = Cookies.get("token");

        if (token) {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/detailuser`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);
  if (error) return <div>Lỗi tải dữ liệu.</div>;
  if (isLoading) return <div>Đang tải...</div>;

  const handleSizeClick = (size) => {
    setSelectedSize(selectedSize === size ? "" : size);
  };

  const handleAddToCart = async () => {
    if (!user) {
      alert("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.");
      return;
    }
    if (!selectedSize) {
      alert("Vui lòng chọn kích thước trước khi thêm vào giỏ hàng.");
      return;
    }

    try {
      // Lấy userId từ thông tin người dùng trong Redux hoặc cookie
      const userId = user._id; // Hoặc lấy từ Cookies nếu lưu trong cookie

      // Gửi yêu cầu tới API để thêm sản phẩm vào giỏ hàng
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/cart`, // Địa chỉ API thêm sản phẩm vào giỏ hàng
        {
          userId, // Thêm userId vào yêu cầu
          productId: product._id, // ID sản phẩm
          quantity: quantity, // Số lượng sản phẩm
          size: selectedSize, // Kích thước đã chọn
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`, // Token của người dùng
          },
        }
      );

      if (response.status === 200) {
        // Nếu thành công, cập nhật lại thông báo và Redux
        dispatch(addToCart({ item: product, quantity, size: selectedSize }));
        setNotification("Đã thêm sản phẩm vào giỏ hàng!");
        setTimeout(() => setNotification(""), 3000);
      }
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm vào giỏ hàng:", error);
      alert("Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng. Vui lòng thử lại.");
    }
  };

  return (
    <div className="container mt-3">
      <div aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="Detail">
            <Link href="#">Chi tiết</Link>
          </li>
          <li className="item_detail">
            <i className="fa-solid fa-chevron-right"></i>
          </li>
          <li className="Detail active" aria-current="page">
            {product.name}
          </li>
        </ol>
      </div>
      <div className="row mb-4">
        <div className="col-md-8">
          <div className="product-container">
            <div className="thumbnail-images d-flex flex-column">
              <img
                src={product.image}
                alt="Hình thu nhỏ 1"
                className="mb-2"
              />
              <img
                src={product.image}
                alt="Hình thu nhỏ 2"
                className="mb-2"
              />
              <img
                src={product.image}
                alt="Hình thu nhỏ 3"
                className="mb-2"
              />
            </div>
            <div className="main-product-image">
              <img
                src={product.image}
                alt="Hình sản phẩm chính"
                className="w-100"
              />
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="name_detail">{product.name}</div>
          <div className="price_giam mb-2">
            <div className="gia_detail">
              ${product.discountedPrice}{" "}
              <del className="price_goc">${product.price}</del>
            </div>
            <div className="text-warning_1 fs-6">
              ★★★★☆<span className="sl_ratings">(3)</span>
            </div>
          </div>

          <div className="mb-3">
            <h6 className="name_detail">Màu sắc</h6>
            <div className="d-flex">
              <div
                className="color-btn bg-secondary rounded-circle me-2"
                style={{ width: "20px", height: "20px" }}
              ></div>
              <div
                className="color-btn bg-danger rounded-circle me-2"
                style={{ width: "20px", height: "20px" }}
              ></div>
              <div
                className="color-btn bg-primary rounded-circle"
                style={{ width: "20px", height: "20px" }}
              ></div>
            </div>
          </div>

          <div className="mb-3">
            <h6 className="mb-2 name_detail">Kích thước</h6>
            <div className="size_detail d-flex flex-wrap">
              {product.size && product.size.length > 0 ? (
                product.size.map((size, index) => (
                  <button
                    key={index}
                    className={`size_button ${
                      selectedSize === size ? "active" : ""
                    }`}
                    onClick={() => handleSizeClick(size)}
                  >
                    {size}
                  </button>
                ))
              ) : (
                <p>Không có kích thước nào</p>
              )}
            </div>
          </div>

          <div className="mb-3">
            <label className="name_detail" htmlFor="quantity">
              Số lượng
            </label>
            <input
              style={{ width: "80px", marginTop: "10px" }}
              type="number"
              id="quantity"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="form-control"
            />
          </div>

          <button
            className="button_detail"
            onClick={() => handleAddToCart("M", 1)}
          >
            Thêm vào giỏ hàng
          </button>
          {/* Hiển thị thông báo */}
          {notification && (
            <div className="alert alert-success mt-2" role="alert">
              {notification}
            </div>
          )}
          <div className="mt-4">
            <h6>Thông tin sản phẩm</h6>
            <p className="text-muted" style={{ fontSize: "0.9rem" }}>
              {product.description}
            </p>
          </div>
        </div>
      </div>

      {/* Phần đánh giá sản phẩm */}
      <div className="ratings-section d-flex flex-column flex-md-row align-items-center pt-4">
        <div className="text-center mb-3 mb-md-0" style={{ width: "150px" }}>
          <div className="display-4 font-weight-bold text-primary">4.7/5</div>
          <div className="text-warning fs-2">★★★★☆</div>
          <span className="text-muted">(3 đánh giá)</span>
        </div>
        <div className="rating-bars flex-grow-1 ms-md-4 w-100">
          {[5, 4, 3, 2, 1].map((rating, index) => (
            <div className="d-flex align-items-center mb-1" key={index}>
              <span className="me-2">{rating} ★</span>
              <div
                className="progress flex-grow-1 me-2"
                style={{ height: "8px" }}
              >
                <div
                  className="progress-bar bg-warning"
                  role="progressbar"
                  style={{ width: `${(index + 1) * 20}%` }}
                ></div>
              </div>
              <span>{index === 2 ? 2 : 0}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Phần chi tiết sản phẩm */}
      <div className="comment-section mt-4">
        <h5 className="comment-title mb-3">Nhận xét</h5>

        <div className="comments-box p-3 rounded bg-light">
          {userComments.map((review, index) => (
            <div key={index} className="review-item mb-3">
              <div className="d-flex align-items-center mb-2">
                <img
                  src="/img/user1.jpg"
                  alt="Người dùng"
                  className="user-avatar me-2"
                  style={{ width: "40px", height: "40px", borderRadius: "50%" }}
                />
                <div>
                  <strong className="user-name">{review.userId}</strong>
                  <span
                    className="user-date d-block text-muted"
                    style={{ fontSize: "0.85rem" }}
                  >
                    {review.date}
                  </span>
                </div>
              </div>
              <div className="user-rating mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`me-1 ${
                      star <= review.rating ? "text-warning" : "text-muted"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <div className="user-comment">
                <p>{review.comment}</p>
              </div>
              {index < userComments.length - 1 && <hr />}
            </div>
          ))}
        </div>
      </div>

      {/* Phần form bình luận và đánh giá */}
      <div className="comment-form-section mt-5 mb-5">
        <h5 className="comment-title mb-3">Gửi đánh giá của bạn</h5>

        <form className="p-3 bg-light rounded">
          <div className="mb-3">
            <label className="form-label">Chọn số sao:</label>
            <div className="rating-input d-flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleStarClick(star)}
                  className={`btn btn-sm me-1 ${
                    star <= rating ? "btn-warning" : "btn-outline-warning"
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="comment" className="form-label">
              Bình luận:
            </label>
            <textarea
              id="comment"
              rows="3"
              className="form-control"
              placeholder="Nhập bình luận của bạn..."
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">
            Gửi đánh giá
          </button>
        </form>
      </div>
    </div>
  );
}
