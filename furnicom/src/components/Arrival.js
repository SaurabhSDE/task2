import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import Heading from "../common/Heading";
import { useDispatch } from "react-redux";
import { addToCart, getCartTotal } from "../redux/cartSlice";
import { fetchDataFromApi } from "../utils/api";

const NextArrow = (props) => (
  <div {...props} className="slick-arrow next-arrow">
    <FontAwesomeIcon icon={faChevronRight} />
  </div>
);

const PrevArrow = (props) => (
  <div {...props} className="slick-arrow prev-arrow">
    <FontAwesomeIcon icon={faChevronLeft} />
  </div>
);

const Arrival = () => {
  const [products, setProducts] = useState([]);
  const [qty] = useState(1);
  const dispatch = useDispatch();
  const sliderRef = useRef(null);
const handleAddToCart = (item) => {
  let totalPrice = qty * item.attributes.price;
  const tempProduct = {
    id: item.id, 
    quantity: qty,
    totalPrice,
    img: process.env.REACT_APP_DEV_URL + item.attributes.img.data[0].attributes.url,
    name: item.attributes.name,
     price: item.attributes.price 
  
  };
  dispatch(addToCart(tempProduct));
  dispatch(getCartTotal());
};

  
  useEffect(() => {
    getpopular();
  }, []);

  const getpopular = () => {
    fetchDataFromApi("/api/products?populate=*")
      .then((res) => {
        if (res && res.data && res.data.length > 0) {
          setProducts(res.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    beforeChange: (current, next) => {
      if (next >= products.length && sliderRef.current) {
        setTimeout(() => {
          sliderRef.current.slickGoTo(0);
        }, 0);
      } else if (next < 0 && sliderRef.current) {
        setTimeout(() => {
          sliderRef.current.slickGoTo(products.length - 1);
        }, 0);
      }
    },
  };

  return (
    <div className="p-8 overflow-hidden text-center relative bg-gray-50 z-0">
      <Heading
        title="New Arrival"
        description="SHOP THE NEW SELECTION OF NEW ARRIVALS AT OUR STORE. FILL OUT YOUR
          WISHLIST ITEM."
      />
      <Slider ref={sliderRef} {...settings}>
        {products.map((item, index) => (
          <div key={index} className="mx-auto max-w-xs relative">
            <div className="p-1 hover:bg-gray-200 hover:shadow transition-all duration-300 relative group">
              <img
                src={process.env.REACT_APP_DEV_URL + item.attributes.img.data[0].attributes.url}
                title={item.attributes.name}
                alt={item.attributes.name}
                className="mx-auto"
                style={{ height: "200px", width: "200px" }}
              />
              <div className="icons absolute top-0 right-0 transform translate-x-full opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                <div className="flex flex-wrap flex-col  p-2 mr-1 mt-1">
                  <FontAwesomeIcon
                    className="p-2 mb-1 bg-white hover:bg-red-500 hover:text-white"
                    title="add to cart"
                    icon="shopping-cart"
                    onClick={() => handleAddToCart(item)}
                  />
                </div>
              </div>
            </div>
            <div className="mt-4">
              <div className="font-semibold uppercase">{item.attributes.name}</div>
              <div>₹{item.attributes.price}</div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Arrival;


