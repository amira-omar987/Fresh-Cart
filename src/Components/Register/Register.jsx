import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { ColorRing, TailSpin } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Helmet } from 'react-helmet';
import logoImage from "../../images/a.png";
import { useEffect } from "react";

const mySchema = Yup.object({
  name: Yup.string()
    .required("Name is required.")
    .min(3, "Name must be at least 3 characters long.")
    .max(20, "Name must not exceed 20 characters."),
  email: Yup.string()
    .email("Please enter a valid email address.")
    .required("Email is required"),

  password: Yup.string()
    .matches(
      /^[A-Z][a-z0-9]{3,8}$/,
      "Password must start with an uppercase letter followed by 3 to 8 lowercase letters or digits."
    )
    .required("Password is required"),
  rePassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords do not match.")
    .required("Password confirmation is required"),

  phone: Yup.string()
    .matches(
      /^01[0125][0-9]{8}$/,
      "Please enter a valid Egyptian mobile phone number."
    )
    .required("Phone is required"),
});

export default function Register() {
  const userData = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  };
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errMessage, setErrMessage] = useState(undefined);

  const navigate = useNavigate();
  useEffect(() => {

    const favicon = document.querySelector("link[rel='icon']");
    if (favicon) {
      favicon.href = logoImage;
    }
  }, []);
  

  async function onSubmit(values) {
    console.log("submitted...", values);

    setIsLoading(true);

    axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
      .then((x) => {
        console.log("success", x);
        setIsSuccess(true);
        setTimeout(function () {
          setIsSuccess(false);
          navigate("/login");
        }, 3000);

        setIsLoading(false);
      })

      .catch((x) => {
        setErrMessage(x.response.data.message);
        setTimeout(function () {
          setErrMessage(false);
        }, 5000);

        setIsLoading(false);
      });
  }

  const myFormik = useFormik({
    initialValues: userData,

    onSubmit: onSubmit,

    validationSchema: mySchema,
  });

  return (
    <>
    <Helmet>
      <title>FreshCart/Register</title>
    </Helmet>
      <div className="w-75 m-auto p-5">
        {isSuccess ? (
          <div className="alert alert-success text-center">
            Your account has been successfully created. Get started now!
          </div>
        ) : (
          ""
        )}

        {errMessage ? (
          <div className="alert alert-danger text-center">{errMessage}</div>
        ) : (
          ""
        )}

        <h2>Register Now :</h2>

        <form onSubmit={myFormik.handleSubmit}>
          <label htmlFor="name">name :</label>

          <input
            onBlur={myFormik.handleBlur}
            onChange={myFormik.handleChange}
            value={myFormik.values.name}
            id="name"
            type="text"
            className="mb-3 form-control"
          />

          {myFormik.errors.name && myFormik.touched.name ? (
            <div className="alert alert-danger"> {myFormik.errors.name} </div>
          ) : (
            ""
          )}

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

          <label htmlFor="rePassword">rePassword :</label>

          <input
            onBlur={myFormik.handleBlur}
            onChange={myFormik.handleChange}
            value={myFormik.values.rePassword}
            id="rePassword"
            type="password"
            className="mb-3 form-control"
          />

          {myFormik.errors.rePassword && myFormik.touched.rePassword ? (
            <div className="alert alert-danger">
              {" "}
              {myFormik.errors.rePassword}{" "}
            </div>
          ) : (
            ""
          )}

          <label htmlFor="phone">phone :</label>
          <input
            onBlur={myFormik.handleBlur}
            onChange={myFormik.handleChange}
            value={myFormik.values.phone}
            id="phone"
            type="tel"
            className="mb-4 form-control"
          />

          {myFormik.errors.phone && myFormik.touched.phone ? (
            <div className="alert alert-danger"> {myFormik.errors.phone} </div>
          ) : (
            ""
          )}

          <button
            type="submit"
            className="bg-main btn p-2 text-white rounded-3 d-block ms-auto "
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
              "Register"
            )}
          </button>
          <h5>Already have an account ? <Link to="/login" className="text-main">login here</Link>.</h5>

        </form>
      </div>
    </>
  );
}
