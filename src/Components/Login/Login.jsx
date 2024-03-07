import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { ColorRing, TailSpin } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { authContext } from "../../Context/AuthContext";
import { Helmet } from "react-helmet";
import logoImage from "../../images/a.png";

const mySchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email address.")
    .required("Email is required"),

  password: Yup.string()
    .matches(
      /^[A-Z][a-z0-9]{3,8}$/,
      "Password must start with an uppercase letter followed by 3 to 8 lowercase letters or digits."
    )
    .required("Password is required"),
});

export default function Login() {
  const userData = {
    email: "",
    password: "",
  };
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errMessage, setErrMessage] = useState(undefined);

  const navigate = useNavigate();
  const { setToken, getUserData } = useContext(authContext);

  async function onSubmit(values) {
    console.log("submitted...", values);

    setIsLoading(true);

    axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
      .then((x) => {
        if (x.data.message == "success") {
          // console.log("token", x.data.token);
          localStorage.setItem("tkn", x.data.token);
          setToken(x.data.token);
          getUserData();
          setIsSuccess(true);
          setTimeout(function () {
            setIsSuccess(false);
            navigate("/home");
          }, 2000);

          setIsLoading(false);
        }
      })

      .catch((x) => {
        setErrMessage(x.response.data.message);
        setTimeout(function () {
          setErrMessage(false);
        }, 5000);

        setIsLoading(false);
      });
  }
  useEffect(() => {
    const favicon = document.querySelector("link[rel='icon']");
    if (favicon) {
      favicon.href = logoImage;
    }
  }, []);

  const myFormik = useFormik({
    initialValues: userData,

    onSubmit: onSubmit,

    validationSchema: mySchema,
  });

  return (
    <>
      <Helmet>
        <title>FreshCart/Login</title>
      </Helmet>
      <div className="w-75 m-auto p-5">
        {isSuccess ? (
          <div className="alert alert-success text-center">Welcome back!</div>
        ) : (
          ""
        )}

        {errMessage ? (
          <div className="alert alert-danger text-center">{errMessage}</div>
        ) : (
          ""
        )}

        <h2 className="mb-3">Login Now :</h2>

        <form onSubmit={myFormik.handleSubmit}>
          <label htmlFor="email">email :</label>

          <input
            onBlur={myFormik.handleBlur}
            onChange={myFormik.handleChange}
            value={myFormik.values.email}
            id="email"
            type="email"
            className="mb-3 form-control"
          />
          {myFormik.errors.email && myFormik.touched.email ? (
            <div className="alert alert-danger"> {myFormik.errors.email} </div>
          ) : (
            ""
          )}
          <label htmlFor="password">password :</label>

          <input
            onBlur={myFormik.handleBlur}
            onChange={myFormik.handleChange}
            value={myFormik.values.password}
            id="password"
            type="password"
            className="mb-3 form-control"
          />

          {myFormik.errors.password && myFormik.touched.password ? (
            <div className="alert alert-danger">
              {" "}
              {myFormik.errors.password}{" "}
            </div>
          ) : (
            ""
          )}
          <div className="d-flex justify-content-between align-items-center mt-4">
            <Link to="/ForgotPass">
              <h5 className="text-main ">Forgot your password ?</h5>
            </Link>
            <button
              type="submit"
              className="bg-main btn p-2 text-white rounded-3  "
            >
              {isLoading ? (
                <ColorRing
                  visible={true}
                  height="35"
                  width="35"
                  ariaLabel="color-ring-loading"
                  wrapperStyle={{}}
                  wrapperClass="color-ring-wrapper"
                  colors={["#ffff", "#ffff", "#ffff", "#ffff", "#ffff"]}
                />
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
