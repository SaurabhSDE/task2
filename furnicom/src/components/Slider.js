import React, { useRef, useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { fetchDataFromApi } from "../utils/api";

const Sliders = () => {
  const [images, setImages] = useState([]);
  const sliderRef = useRef(null);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };


  useEffect(() => {
    getPopular();
  }, []);

  const getPopular = () => {
    fetchDataFromApi("/api/sliders?populate=*")
      .then((res) => {
        if (res && res.data && res.data.length > 0) {
          setImages(res.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching slider data:", error);
      });
  };

  return (
    <div className="overflow-hidden relative">
      <Slider ref={sliderRef} {...settings}>
        {images.map((item, index) => (
          <div key={index}>
            <img className="w-full" src={process.env.REACT_APP_DEV_URL+item.attributes.img.data[0].attributes.url} alt="Slider Image" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Sliders;
