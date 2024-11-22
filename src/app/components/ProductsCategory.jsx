"use client";
import React, { useState } from "react";
import Link from "next/link";

function ProductsHome(props) {
  const [currentPage, setCurrentPage] = useState(1); // State quản lý trang hiện tại
  const itemsPerPage = 12; // Số lượng sản phẩm hiển thị mỗi trang

  // Tính toán sản phẩm hiện tại để hiển thị
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = props.data.slice(indexOfFirstItem, indexOfLastItem);

  // Tính tổng số trang
  const totalPages = Math.ceil(props.data.length / itemsPerPage);

  // Hàm chuyển trang
  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <>
      {currentItems.map((product) => {
        const { _id, name, image, price, discountedPrice } = product;
        return (
          <div className="col-6 col-md-4 col-lg-3 mb-2 p-1 rounded" key={_id}>
            <div className="sup-h">
              <div className="w-img gray-background">
                <Link href={`/chitiet/${_id}`}>
                  <img
                    src={image}
                    alt={image}
                    className="img-fluid img-gray "
                  />
                </Link>
                <button className="sup-wimg fw-medium">Quick Add</button>
              </div>
              <div className="mt-2 fw-medium">
                <div className="d-flex justify-content-between">
                  <Link href={""} className="namesup">
                    {name}
                  </Link>
                  <svg
                    className="icon-svg"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3c2.08 0 4.5 2.42 4.5 5.5 0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </div>
                <span className="price">
                  <p>${discountedPrice}</p>
                  <del>${price}</del>
                </span>
              </div>
            </div>
          </div>
        );
      })}

      {/* Phân trang */}
      <div className="pagination">
        <button
          onClick={() => paginate(currentPage - 1)}
          className="btn btn-outline-dark"
          disabled={currentPage === 1}
        >
          &laquo;
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`btn ${
              currentPage === index + 1 ? "btn-dark" : "btn-outline-dark"
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => paginate(currentPage + 1)}
          className="btn btn-outline-dark"
          disabled={currentPage === totalPages}
        >
          &raquo;
        </button>
      </div>
    </>
  );
}

export default ProductsHome;
