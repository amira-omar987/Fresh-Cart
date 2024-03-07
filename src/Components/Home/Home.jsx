import React, { useEffect } from "react";
import Products from "../Products/Products";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CategorySlider from "../CategorySlider/CategorySlider";
import logoImage from "../../images/a.png";
import { Helmet } from "react-helmet";



export default function SimpleSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay :true,
    autoplaySpeed: 1500,
   
  };

  useEffect(() => {

    const favicon = document.querySelector("link[rel='icon']");
    if (favicon) {
      favicon.href = logoImage;
    }
  }, []);
  


  return (
    <>
       <Helmet>
        <title>FreshCart</title>
      </Helmet>
    
  
      <div className="img">
        <div className="container py-4">
          <div className="row">
            <div className="col-md-8">
              <Slider {...settings}>
                <div>
                  <img
                    style={{ height: "400px" }}
                    className="w-100"
                    src={require("../../images/slider-image-3.jpeg")}
                    alt=""
                  />
                </div>

                <div>
                  <img
                    style={{ height: "400px" }}
                    className="w-100"
                    src={require("../../images/slider-image-2.jpeg")}
                    alt=""
                  />
                </div>

                <div>
                  <img
                    style={{ height: "400px" }}
                    className="w-100"
                    src={require("../../images/blog-img-2.jpeg")}
                    alt=""
                  />
                </div>
                <div>
                  <img
                    style={{ height: "400px" }}
                    className="w-100"
                    src={require("../../images/grocery-banner-2.jpeg")}
                    alt=""
                  />
                </div>
              </Slider>
            </div>
            <div className="col-md-4 mb-4">
              <img
                style={{ height: "200px" }}
                className="w-100"
                src={require("../../images/blog-img-1.jpeg")}
                alt=""
              />
              <img
                style={{ height: "200px" }}
                className="w-100"
                src={require("../../images/slider-image-1.jpeg")}
                alt=""
              />
            </div>
            <div className=" my-4">
              <h2 className="py-4">Shop Popular Categories</h2>
              <CategorySlider />
            </div>
          </div>
        </div>
      </div>

      <Products />
   
    </>
  );
}
