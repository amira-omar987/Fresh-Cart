import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import Slider from "react-slick";
import { ColorRing } from "react-loader-spinner";

export default function CategorySlider() {
  function getCategory() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }
  const { data, isLoading } = useQuery("categorySlider", getCategory);

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

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplay :true,
    autoplaySpeed: 2000,
  };
  return (
    <Slider {...settings}>
      {data.data.data.map((category, idx) => (
        <div key={idx}>
          <img style={{height:'200px'}} className="w-100" src={category.image} alt={category.name} />
          <h4>{category.name}</h4>
        </div>
      ))}
    </Slider>
  );
}
