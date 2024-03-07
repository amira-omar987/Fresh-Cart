import axios from "axios";
import React, { useContext } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";
import { cartContext } from "../../Context/CartContext/CartContext";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";

import logoImage from "../../images/a.png";
import { useEffect } from "react";


export default function ProductDetails() {
  const { addProductToCart } = useContext(cartContext);
  // console.log("addProductToCart", addProductToCart);

  const { id } = useParams();
  useEffect(() => {

    const favicon = document.querySelector("link[rel='icon']");
    if (favicon) {
      favicon.href = logoImage;
    }
  }, []);

  async function addProduct(id) {
    const response = await addProductToCart(id);
    console.log(response.data);
    if (response.data.status === "success") {
      toast.success('Added Successfully to your cart' , {duration:2000, position: "top-center" ,style: {
       padding: '15px',
      } } )
    }
    else{
      toast.error('Error occurred try again...' , {duration:2000, position: "top-center" , style :{
        padding: '15px',
      } })

    }
  }

  function getProductDetails() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }

  const { isLoading, data, isError } = useQuery(
    "productDetails",
    getProductDetails
  );

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

  const productDetails = data.data.data;

  return (
    <>
    <Helmet><title>FreshCart/productDetails
      </title></Helmet>
      <div className="container py-4">
        <div className="row align-items-center">
          <div className="col-md-3">
            <figure>
              <img
                className="w-100 shadow-sm"
                src={productDetails.imageCover}
                alt={productDetails.title}
              />
            </figure>
          </div>

          <div className="col-md-9 pe-3">
            <article className="p-3">
              <h2 className=" mb-3">{productDetails.title}</h2>
              <p className=" text-muted mb-4">{productDetails.description}</p>
              <div className="d-flex justify-content-between ">
                <p className="h5 ">
                  <span className="fw-bold text-danger">Price:</span>{" "}
                  <span className="h5">
                    <span
                      style={{
                        color: productDetails.priceAfterDiscount
                          ? "red"
                          : "inherit",
                      }}
                      className={
                        productDetails.priceAfterDiscount
                          ? "text-decoration-line-through h5"
                          : "h5"
                      }
                    >
                      {productDetails.price}EGp
                    </span>{" "}
                    {productDetails.priceAfterDiscount
                      ? `- ${productDetails.priceAfterDiscount}EGp`
                      : ""}
                  </span>
                </p>

                <p>
                  {" "}
                  <span>
                    <i
                      style={{ color: "gold" }}
                      className="fa solid fa-star p-1"
                    ></i>
                    {productDetails.ratingsAverage}
                  </span>
                </p>
              </div>
              <p className="h5 mb-4 ">
                {" "}
                <span className="fw-bold text-danger">Brand:</span>{" "}
                {productDetails.brand.name}
              </p>
              {/* <p> id :{data.data.data.id}</p> */}
              <button
                onClick={() => addProduct(data.data.data.id)}
                className="btn bg-main text-white w-100"
              >
                Add to Cart +
              </button>
            </article>
          </div>
        </div>
      </div>
    </>
  );
}
