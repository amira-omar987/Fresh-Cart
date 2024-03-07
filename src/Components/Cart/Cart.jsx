import React, { useContext, useEffect, useState } from "react";
import { cartContext } from "../../Context/CartContext/CartContext";
import { ColorRing, TailSpin } from "react-loader-spinner";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import logoImage from "../../images/a.png";

export default function Cart() {
  const {
    numOfCartItems,
    totalCartPrice,
    allProducts,
    updateCount,
    deleteProduct,
    clearCart,
  } = useContext(cartContext);

  async function updateMyProductCount(id, newCount) {
    const res = await updateCount(id, newCount);
    if (res) {
      toast.success("Product updated Successfully ", { position: "top-center" });
    } else {
      toast.error("Error occurred... ", { position: "top-center" });
    }
  }

  async function myDeleteProduct(id) {
    const res = await deleteProduct(id);
    if (res) {
      toast.success("deleted Successfully ", { position: "top-center" });
    } else {
      toast.error(" Error occurred...", { position: "top-center" });
    }
  }
  useEffect(() => {

    const favicon = document.querySelector("link[rel='icon']");
    if (favicon) {
      favicon.href = logoImage;
    }
  }, []);

  if (!allProducts) {
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
        <title>FreshCart/myCart</title>
      </Helmet>
      {allProducts.length ? (
        <div className="container bg-main-light p-3 my-4">
          <div className="d-flex justify-content-between">
            <div className="p-2">
              <h2 className="fw-bold  p-1">Shop Cart :</h2>
              <h5 className="text-main  my-2">
                Total Cart Price :{totalCartPrice} EGp
              </h5>
            </div>

            <Link to="/Payment" className="mt-4">
              <button className="btn bg-primary  py-2">confirm payment</button>
            </Link>
          </div>

          {allProducts.map((product, idx) => {
            return (
              <div
                key={idx}
                className="row align-items-center  border-1 border-bottom  p-1"
              >
                <div className="col-md-1">
                  <figure>
                    <img
                      className="w-100"
                      src={product.product.imageCover}
                      alt={product.product.title}
                    />
                  </figure>
                </div>
                <div className="col-md-9">
                  <article>
                    <h5 className="my-2">{product.product.title}</h5>

                    <h5 className="text-main">Price:{product.price}</h5>
                    <button
                      onClick={() => myDeleteProduct(product.product.id)}
                      className="btn btn-outline-danger my-2"
                    >
                      {" "}
                      <i class="fa-solid fa-trash"></i> Remove
                    </button>
                  </article>
                </div>
                <div className="col-md-2">
                  <div className="d-flex justify-content-between align-items-center">
                    <button
                      onClick={() =>
                        updateMyProductCount(
                          product.product.id,
                          product.count + 1
                        )
                      }
                      className=" btn btn-outline-success"
                    >
                      +
                    </button>
                    <p> {product.count}</p>
                    <button
                      disabled={product.count == 0}
                      onClick={() =>
                        updateMyProductCount(
                          product.product.id,
                          product.count - 1
                        )
                      }
                      className=" btn btn-outline-success"
                    >
                      -
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          <button
            onClick={clearCart}
            className="btn bg-danger text-white py-2 px-3 d-block ms-auto mt-3"
          >
            Clear my cart
          </button>
        </div>
      ) : (
        <div className="container my-5 bg-main-light p-4">
          <div className="row">
            <h4>Shop Cart :</h4>
            <h4 className="mt-4">Your cart is empty...</h4>
          </div>
        </div>
      )}
    </>
  );
}
