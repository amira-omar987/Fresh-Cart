import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import logoImage from "../../images/a.png";

import { ColorRing } from "react-loader-spinner";
import { authContext } from "./../../Context/AuthContext";
export default function AllOrders() {
  const [allOrders, setAllOrders] = useState(null);
  const { myToken } = useContext(authContext);
  const { allProducts } = useContext(authContext);

  function getUserOrders() {
    const userID = localStorage.getItem("userID");

    if (!userID) {
      console.log("User ID not found in local storage");
      return; // Exit function if userID is not found
    }

    axios
      .get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userID}`)
      .then((res) => {
        setAllOrders(res.data);
      })
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          console.log("No orders found for this user.");
          // Handle the 404 error gracefully (e.g., display a message to the user)
        } else {
          console.log("Failed to retrieve user orders:", err);
        }
      });
  }

  useEffect(() => {
    getUserOrders();
  }, [myToken]);

  if (!allOrders || allOrders.length === 0) {
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

      <title>FreshCart/allOrders</title>
    </Helmet>
    {allOrders?   <div className="container py-4">
        <div className="row">
          {allOrders?.map((order, idx) => (
            <div key={idx} className="col-md-6">
              <div className="order bg-main-light p-2">
                <h5>Payment Method: <span className="text-main">{order.paymentMethodType}</span></h5>
                <h5>Order price: <span className="text-main">{order.totalOrderPrice} </span></h5>
                <p className="fw-bold">
                  This order is delivering to {order.shippingAddress.city} ,
                  phone number: {order.shippingAddress.phone} , details:
                  {order.shippingAddress.details}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div> : <div>
      <h2>No orders found</h2>
        <p>You haven't made any orders yet.</p>
        
        
        </div>}
    </>
  );
}
