import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import PropTypes from "prop-types";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./sliderStyles.scss";


export default function ProductViewSlider({ images }) {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  let sliderRef1 = useRef(null);
  let sliderRef2 = useRef(null);

  useEffect(() => {
    setNav1(sliderRef1);
    setNav2(sliderRef2);
  }, []);

  const responsiveSettings = [
    {
      breakpoint: 1441,
      settings: {
        slidesToShow: 3,
        vertical: true,
        autoplay: true,
        speed: 500,
        arrows: false,


      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        vertical: true,
        autoplay: true,
        speed: 500,
        arrows: false,
        dots: true,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
        vertical: true,
        autoplay: true,
        speed: 800,
        dots: true,
      },
    },
    {
      breakpoint: 425,
      settings: {
        slidesToShow: 1,
        arrows: false,
        fade: true,
        dots: true,
        autoplay: true,
        speed: 800,
        className: "vertical-slider",
      },
    },
  ];

  return (
    <div className="sliderContainer">
      <Slider
        className="thumbnailsSlider"
        asNavFor={nav1}
        // eslint-disable-next-line no-return-assign
        ref={(slider) => (sliderRef2 = slider)}
        slidesToShow={3}
        swipeToSlide
        focusOnSelect
        infinite
        responsive={responsiveSettings}
      >

        {images.map((image, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={index}>
            <img
              className="littlePhoto"
              width="100%"
              height="100%"
              src={image}
              alt={`товарне зображення ${index}`}
            />
          </div>
        ))}


      </Slider>
      <Slider
        className="mainSlider"
        asNavFor={nav2}
        // eslint-disable-next-line no-return-assign
        ref={(slider) => (sliderRef1 = slider)}
        dots
        slidesToShow={1}
      >
        {images.map((image, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={index}>
            <img
              width="100%"
              height="100%"
              src={image}
              alt={`товарне зображення ${index}`}
            />
          </div>
        ))}

      </Slider>
    </div>
  );
}

ProductViewSlider.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
};
