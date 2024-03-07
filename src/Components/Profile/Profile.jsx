import React, { useEffect } from "react";
import { authContext } from "../../Context/AuthContext";
import { useContext } from "react";
import { Helmet } from "react-helmet";
import logoImage from "../../images/a.png";

export default function Profile() {
  const { userData } = useContext(authContext);
  
  useEffect(() => {

    const favicon = document.querySelector("link[rel='icon']");
    if (favicon) {
      favicon.href = logoImage;
    }
  }, []);


  if (!userData) {
    <h2>Loading...</h2>;
  }

  return (
    <>
    <Helmet>
      <title>FreshCart/profile</title>
    </Helmet>
      <div className="container my-4 p-3">
        <h1>Hello {userData?.name}!</h1>
      </div>
    </>
  );
}

