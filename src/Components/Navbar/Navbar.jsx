import React, { useContext, useEffect } from "react";
import logo from "../../images/freshcart-logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../../Context/AuthContext";
import { cartContext } from "../../Context/CartContext/CartContext";

export default function Navbar() {
  const { myToken, setToken } = useContext(authContext);
  // console.log("token in navbar", myToken);
  const { numOfCartItems } = useContext(cartContext);

  const navigate = useNavigate();

  useEffect(() => {
    // console.log("Num of cart items:", numOfCartItems);
  }, [numOfCartItems]);

  function logout() {
    setToken(null);
    localStorage.removeItem("tkn");

    navigate("/login");
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="Fresh Cart" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {myToken ? (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/Home"
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Cart">
                    Cart
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/Products">
                    Products
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/Categories">
                    Categories
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/Brands">
                    Brands
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/AllOrders">
                    All Orders
                  </Link>
                </li>

             
              </ul>
            ) : (
              ""
            )}

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
              <li className="nav-item">
                <ul className="list-unstyled d-flex align-items-center">
                  <li>
                    <i className="fa-brands fa-instagram me-3"></i>
                  </li>
                  <li>
                    <i className="fa-brands fa-facebook me-3"></i>
                  </li>
                  <li>
                    <i className="fa-brands fa-tiktok  me-3"></i>
                  </li>
                  <li>
                    <i className="fa-brands fa-linkedin me-3"></i>
                  </li>
                  <li>
                    <i className="fa-brands fa-youtube me-3"></i>
                  </li>
                </ul>
              </li>

              {myToken ? (
                <>
               
                  <li className="nav-item position-relative">
                    <span onClick={logout} role="button" className="nav-link">
                      <i  
                        className="fa-solid fa-cart-shopping me-3"
                        style={{
                          color: "black",
                          position: "relative",
                          fontSize: "22px",
                        }}
                      >
                        <span
                          style={{ fontSize: "10px" }}
                          className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-main"
                        >
                          {numOfCartItems ? numOfCartItems : ""}
                        </span>
                      </i>
                      Logout
                    </span>
                  </li>

                  <li className="nav-item">
                    <Link to={"/profile"} className="nav-link fw-bold">
                      Profile
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/Login">
                      Login
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" to="/Register">
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
