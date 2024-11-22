import Link from "next/link";
import ProductsHome from "./components/ProductsHome";

export default async function Home() {
  // Fetch dữ liệu bất đồng bộ
  const res = await fetch("http://localhost:3000/products", {
    cache: "no-store",
  });

  // Kiểm tra lỗi khi fetch
  if (!res.ok) {
    console.error("Failed to fetch data");
    return <div>Error loading products.</div>;
  }

  const data = await res.json();

  return (
    <>
      <div>
        {/* banner */}
        <div className="banner-1">
          <div className="video-container">
            <Link href={"/"}>
              <video
                autoPlay
                muted
                loop
                playsInline
                data-testid="video-banner"
                aria-label="30/40/50 hero"
                poster="https://cdn.shopify.com/s/files/1/0293/9277/files/ENGLISH_DESKTOP_STILL.png?v=1727818039"
              >
                <source
                  src="https://cdn.shopify.com/videos/c/o/v/75589e7ba86043039b077baa855ec68a.mp4"
                  type="video/mp4"
                />
              </video>
            </Link>
          </div>
        </div>
        <div className="banner-1">
          <img src="img/banner1.3.webp" alt="" className="img-fluid w-100" />
        </div>
        {/* banner */}

        {/* list shoes */}
        <div className="grid-container my-2">
          <div className="row g-2">
            <div className="col-6 col-md-3">
              <div className="shoens">
                <img src="img/shoes.webp" alt="" className="img-fluid" />
                <button
                  type="button"
                  className="fw-bolder text-uppercase bt-h2"
                >
                  Shop boost
                </button>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="shoens">
                <img src="img/shoes4.webp" alt="" className="img-fluid" />
                <button
                  type="button"
                  className="fw-bolder text-uppercase bt-h2"
                >
                  Shop boost
                </button>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="shoens">
                <img src="img/shoes2.webp" alt="" className="img-fluid" />
                <button
                  type="button"
                  className="fw-bolder text-uppercase bt-h2"
                >
                  Shop boost
                </button>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="shoens">
                <img src="img/shoes3.webp" alt="" className="img-fluid" />
                <button
                  type="button"
                  className="fw-bolder text-uppercase bt-h2"
                >
                  Shop boost
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* list shoes */}

        {/* body */}
        <div className="container main-body custom-container">
          <h2 className="text_h2 text-uppercase">shop the latest</h2>
          <div className="d-flex flex-wrap gap-2 mb-3 button_new">
            <button>
              <Link href={"#"} className="btn-outline-dark">
                New in
              </Link>
            </button>
            <button>
              <Link href={"#"} className="btn-outline-dark">
                Sale
              </Link>
            </button>
            <button>
              <Link href={"#"} className="btn-outline-dark">
                Dresses
              </Link>
            </button>
            <button>
              <Link href={"#"} className="btn-outline-dark">
                Jeans
              </Link>
            </button>
            <button>
              <Link href={"#"} className="btn-outline-dark">
                Sets
              </Link>
            </button>
          </div>

          <div className="row">
            {/* Truyền data vào ProductsHome */}
            <ProductsHome data={data} />
          </div>
        </div>
      </div>
    </>
  );
}
