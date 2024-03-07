import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ColorRing } from "react-loader-spinner";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { cartContext } from "../../Context/CartContext/CartContext";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";
import logoImage from "../../images/a.png";

export default function Products() {
  const { addProductToCart } = useContext(cartContext);
  const [searchQuery, setSearchQuery] = useState("");
  const { isLoading, data, isFetching } = useQuery(
    "getAllProducts",
    getAllProducts
  );

  async function getAllProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  async function addProduct(id) {
    const response = await addProductToCart(id);
    console.log(response.data, "in product");
    if (response.data.status === "success") {
      toast.success("Added Successfully to your cart", {
        duration: 2000,
        position: "top-center",
        style: {
          padding: "15px",
        },
      });
    } else {
      toast.error("Error occurred try again...", {
        duration: 2000,
        position: "top-center",
        style: {
          padding: "15px",
        },
      });
    }
  }

  useEffect(() => {
    const favicon = document.querySelector("link[rel='icon']");
    if (favicon) {
      favicon.href = logoImage;
    }
  }, []);
  function handleInputChange(event) {
    setSearchQuery(event.target.value);
  }
  function filterProducts(products) {
    return products.filter(
      (product) =>
        product.title
          .toLowerCase()
          .includes(searchQuery.trim().toLowerCase()) ||
        product.category.name
          .toLowerCase()
          .includes(searchQuery.trim().toLowerCase())
    );
  }

  

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-main-light">
        <ColorRing
          visible={true}
          height="100"
          width="100"
          ariaLabel="color-ring-loading"
          wrapperStyle={{}}
          wrapperClass="color-ring-wrapper"
          colors={["#000", "#000", "#000", "#000", "#000"]}
        />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>FreshCart</title>
      </Helmet>
      <div className="img">
        <div className="container py-4 ">
          <div className="row products p-3 gy-3">
            <input
              type="text"
              className="w-100 mx-auto rounded-5 py-3 px-4 my-3 text-black"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleInputChange}
            />
            {filterProducts(data.data.data).map((product, idx) => (
              <div
                key={idx}
                className="col-md-3 overflow-hidden  p-3 position-relative"
              >
                <Link
                  className="product shadow-sm"
                  to={`/ProductDetails/${product.id}`}
                >
                  <div className="shadow-sm h-100 ">
                    <img src={product.imageCover} className="w-100 " alt="" />

                    <h3 className="h5 text-main my-3 px-2">
                      {product.category.name}
                    </h3>
                    <h2 style={{ fontWeight: 600 }} className="h5 px-2 mb-3">
                      {product.title.split(" ").slice(0, 2).join(" ")}
                    </h2>
                    <div className="d-flex justify-content-between px-2">
                      {product.priceAfterDiscount ? (
                        <p className="h5">
                          <span
                            style={{
                              color: "red",
                              textDecoration: "line-through",
                            }}
                            className="text-decoration-line-through h5"
                          >
                            {" "}
                            {product.price}EGp
                          </span>{" "}
                          - {product.priceAfterDiscount}EGp
                        </p>
                      ) : (
                        <p className=" h5"> {product.price}EGp</p>
                      )}
                      <p>
                        {" "}
                        <span>
                          <i
                            style={{ color: "gold" }}
                            className="fa solid fa-star"
                          ></i>
                        </span>{" "}
                        {product.ratingsAverage}
                      </p>
                    </div>
                  </div>
                </Link>
                <button
                  onClick={() => addProduct(product.id)}
                  className="btn bg-main d-block m-auto w-50 p-2 addBtn  "
                >
                  + Add
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
