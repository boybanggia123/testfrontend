"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import useSWR from "swr";
import ProductsCategory from "../../components/ProductsCategory";
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ProductByCategoryPage() {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortOption, setSortOption] = useState("asc");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const { data: categories, error } = useSWR(
    `http://localhost:3000/products/${id}`,
    fetcher
  );

  // Hàm mở/đóng menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch("http://localhost:3000/products", {
        cache: "no-store",
      });
      const newProducts = await res.json();
      setProducts(newProducts);
    }
    fetchProducts();
  }, [id]);

  // Hàm xử lý lọc sản phẩm theo danh mục, giá và sắp xếp
  const handleSortAndFilter = (products) => {
    let filteredProducts = products;

    // Lọc theo giá
    if (minPrice) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price >= minPrice
      );
    }

    if (maxPrice) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price <= maxPrice
      );
    }

    // Sắp xếp sản phẩm theo giá
    return filteredProducts.sort((a, b) => {
      return sortOption === "asc" ? a.price - b.price : b.price - a.price;
    });
  };

  // Sự kiện chọn danh mục
  const handleCategoryChange = (categoryId) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(
        selectedCategories.filter((id) => id !== categoryId)
      ); // Bỏ chọn nếu đã chọn trước đó
    } else {
      setSelectedCategories([...selectedCategories, categoryId]); // Thêm vào danh mục đã chọn
    }
  };

  // Sự kiện thay đổi giá
  const handleMinPriceChange = (e) => {
    setMinPrice(e.target.value);
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(e.target.value);
  };

  // Sự kiện thay đổi sắp xếp
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  // const handleSortAndFilter = (data) => {
  //   return data;
  // };
  return (
    <>
      <div>
        {/* products */}
        <div className="container-fluid m-0">
          <div className="row">
            {/* Nút mở menu trên mobile */}
            <button
              className="btn btn-primary m-0 d-md-none mb-3"
              onClick={toggleMenu}
            >
              {isMenuOpen ? "Close Filter" : "Open Filter"}
            </button>

            {/* Bộ lọc bên trái */}
            <div
              className={`col-md-2 custom-filter-section m-0 rounded-0 ${
                isMenuOpen ? "d-block" : "d-none"
              } d-md-block`}
            >
              <div className="Categories_phai">REFINE BY</div>

              {/* Danh mục */}
              <hr />

              {/* Kích thước */}
              <div className="custom-filter">
                <h6>Size</h6>
                <ul className="list-unstyled">
                  <li>
                    <input
                      className="input_checkbox"
                      type="checkbox"
                      id="sizeS"
                    />
                    <label htmlFor="sizeS" className="label_trai ms-0">
                      S
                    </label>
                  </li>
                  <li>
                    <input
                      className="input_checkbox"
                      type="checkbox"
                      id="sizeM"
                    />
                    <label htmlFor="sizeM" className="label_trai ms-0">
                      M
                    </label>
                  </li>
                  <li>
                    <input
                      className="input_checkbox"
                      type="checkbox"
                      id="sizeL"
                    />
                    <label htmlFor="sizeL" className="label_trai ms-0">
                      L
                    </label>
                  </li>
                  <li>
                    <input
                      className="input_checkbox"
                      type="checkbox"
                      id="sizeXL"
                    />
                    <label htmlFor="sizeXL" className="label_trai ms-0">
                      L/XL
                    </label>
                  </li>
                </ul>
              </div>
              <hr />

              {/* Màu sắc */}
              <div className="custom-filter">
                <h6>Colors</h6>
                <ul className="list-unstyled">
                  <li>
                    <input
                      className="input_checkbox"
                      type="checkbox"
                      id="colorBlack"
                    />
                    <label htmlFor="colorBlack" className="label_trai ms-0">
                      Black
                    </label>
                  </li>
                  <li>
                    <input
                      className="input_checkbox"
                      type="checkbox"
                      id="colorBrown"
                    />
                    <label htmlFor="colorBrown" className="label_trai ms-0">
                      Brown
                    </label>
                  </li>
                </ul>
              </div>
            </div>

            {/* Lưới sản phẩm bên phải */}
            <div className="col-md-10 custom-product-section">
              <div className="d-flex mt-3 justify-content-between align-items-center mb-4 flex-column flex-md-row gap-2">
                <div className="Products_show fw-bold">DANH MỤC SẢN PHẨM</div>
                <div className="d-flex flex-column flex-md-row gap-2 align-items-center mt-2 mt-md-0">
                  <div className="price-filter d-flex align-items-center">
                    <label htmlFor="minPrice" className="me-2">
                      Price range:
                    </label>
                    <input
                      type="number"
                      id="minPrice"
                      className="form-control rounded-0"
                      placeholder="Min"
                      value={minPrice}
                      onChange={handleMinPriceChange}
                      style={{
                        width: "100px",
                        height: "28px",
                        fontSize: ".75rem",
                      }}
                    />
                    <span className="mx-2">-</span>
                    <input
                      type="number"
                      id="maxPrice"
                      className="form-control rounded-0"
                      placeholder="Max"
                      value={maxPrice}
                      onChange={handleMaxPriceChange}
                      style={{
                        width: "100px",
                        height: "28px",
                        fontSize: ".75rem",
                      }}
                    />
                  </div>
                  <select
                    className="form-select form-select-sm custom-select mt-2 mt-md-0 rounded-0"
                    onChange={handleSortChange}
                  >
                    <option value="asc">Giá tăng dần</option>
                    <option value="desc">Giá giảm dần</option>
                  </select>
                </div>
              </div>
              {/* Lưới sản phẩm */}
              <div className="row g-4 custom-product-grid">
                <ProductsCategory
                  data={handleSortAndFilter(categories || [])}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
