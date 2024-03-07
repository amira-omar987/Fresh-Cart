import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import logoImage from "../../images/a.png";
import axios from "axios";
import { useQuery } from "react-query";
import { ColorRing } from "react-loader-spinner";

export default function Categories() {
  const { data ,isLoading } = useQuery("getAllCategories", getAllCategories);

  async function getAllCategories() {
    const res = await axios.get(
      "https://route-ecommerce.onrender.com/api/v1/categories"
    );
    return res.data.data; 
  }

  useEffect(() => {
    const favicon = document.querySelector("link[rel='icon']");
    if (favicon) {
      favicon.href = logoImage;
    }
  }, []);

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
        <title>FreshCart/categories</title>
      </Helmet>
      <div className="container my-5 p-3">
        <div className="row gy-3">
          {data?.map((category, idx) => (
            <div key={idx} className="col-md-4 ">
             <div className="shadow-sm catego ">
             <img className="w-100  " style={{height:'400px'}} src={category.image} alt={category.name} />
              <h3 className="text-main fw-bold text-center p-3">{category.name}</h3>
             </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
