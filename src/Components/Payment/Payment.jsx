import axios from "axios";
import React, { useEffect } from "react";
import { useContext } from "react";
import { cartContext } from "../../Context/CartContext/CartContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import logoImage from "../../images/a.png";

export default function () {
  const { cartID ,getUserCart } = useContext(cartContext);
  const nav = useNavigate()

  useEffect(() => {

    const favicon = document.querySelector("link[rel='icon']");
    if (favicon) {
      favicon.href = logoImage;
    }
  }, []);
  function confirmCashPayment() {
    const details = document.getElementById("details").value;
    const phone = document.getElementById("phone").value;
    const city = document.getElementById("city").value;
    const shippingObject = {
      shippingAddress: {
        details,
        phone,
        city,
      },
    };

    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartID}`,
        shippingObject,
        {
          headers: { token: localStorage.getItem("tkn") },
        }
      )
      .then((res) => {
        if (res.data.status === "success") {
          toast.success("Payment completed successfully");
          getUserCart();
          setTimeout(() => {
            nav('/Home')
          }, 1500);
        }
      })
      .catch((err) => {
        console.log("err", err);
        toast.error("Error occurred try again...");
      });
  }



  function confirmOnlinePayment() {
    const details = document.getElementById("details").value;
    const phone = document.getElementById("phone").value;
    const city = document.getElementById("city").value;
    const shippingObject = {
      shippingAddress: {
        details,
        phone,
        city,
      },
    };

    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartID}`,
        shippingObject,
        {
          headers: { token: localStorage.getItem('tkn') },  
          params: { url : 'http://localhost:3000'}
        } 

      )
      .then((res) => {
        if (res.data.status === "success") {
          // toast.success("Payment completed successfully");
          // getUserCart();
        

          window.open(res.data.session.url , "_self")
        }
      })
      .catch((err) => {
        console.log("err", err);
        toast.error("Error occurred try again...");
      });
  }


  return (
    <>
    <Helmet>
      <title>FreshCart/Pay</title>
    </Helmet>
      <div className="container w-50  py-4  bg-main-light my-5">
        <label htmlFor="phone">phone</label>
        <input id="phone" className="form-control mb-2" type="text" required />

        <label htmlFor="city">city</label>
        <input id="city" type="text" required  className="form-control mb-2" />

        <label htmlFor="details">details</label>
        <textarea
          type="text "
          id="details"
          placeholder="details..."
          className=" form-control mb-2"
        ></textarea>

       <div className="d-flex justify-content-between ">
       <button onClick={confirmCashPayment} className="btn bg-primary mt-4 w-25 text-white ">
          Cash payment
        </button>

        <button onClick={confirmOnlinePayment} className="btn bg-primary mt-4 w-25  text-white ">
          Online payment
        </button>
       </div>
      </div>
    </>
  );
}
