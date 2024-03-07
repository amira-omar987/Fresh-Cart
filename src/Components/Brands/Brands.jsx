import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import logoImage from "../../images/a.png";
import axios from "axios";
import { useQuery } from "react-query";
import { ColorRing } from "react-loader-spinner";

export default function Brands() {
  const { data, isLoading } = useQuery("getAllBrands", getAllBrands);

  async function getAllBrands() {
    try {
      const res = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/brands"
      );
      return res.data.data; // Return the data from the Axios request
    } catch (err) {
      console.log("err", err);
      throw err; // Throw the error to be caught by the React Query hook
    }
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
        <title>FreshCart/brands</title>
      </Helmet>
      <div className="container my-5 p-3">
        <div className="row gy-3">
          {data?.map((brand, idx) => (
            <div key={idx} className="col-md-4">
              <div className="brand-item shadow-sm  bg-main-light catego">
                <img src={brand.image} alt={brand.name} />
                
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
