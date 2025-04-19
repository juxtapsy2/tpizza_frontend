import Slider from "react-slick";
import event1 from "../../assets/events/event1.png";
import event2 from "../../assets/events/event2.png";
import event3 from "../../assets/events/event3.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";

// Arrows
function NextArrow(props) {
  const { onClick } = props;
  return (
    <div
      className="absolute top-1/2 right-8 sm:right-4 -translate-y-1/2 z-30 cursor-pointer text-white bg-transparent/20 hover:bg-green-900 p-5 rounded-full text-4xl shadow-md"
      onClick={onClick}
    >
      ❯
    </div>
  );
}

function PrevArrow(props) {
  const { onClick } = props;
  return (
    <div
      className="absolute top-1/2 left-8 sm:left-4 -translate-y-1/2 z-30 cursor-pointer text-white bg-transparent/20 hover:bg-green-900 p-5 rounded-full text-4xl shadow-md"
      onClick={onClick}
    >
      ❮
    </div>
  );
}

const slides = [
  {
    image: event2,
    title: "Pizza Party Event",
  },
  {
    image: event1,
    title: "Discount Pizza Night",
  },
  {
    image: event3,
    title: "Pizza Making Workshop",
  },
];

function EventCarousel() {
  const settings = {
    centerMode: true,
    centerPadding: "20%",
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          centerPadding: "10%",
        },
      },
      {
        breakpoint: 480,
        settings: {
          centerPadding: "0",
        },
      },
    ],
    customPaging: () => (
      <div className="w-2 h-2 mt-2 rounded-full transition-all duration-300"></div>
    ),
    appendDots: dots => (
      <div>
        <ul className="flex justify-center gap-0 mt-6">{dots}</ul>
      </div>
    ),
  };

  return (
    <div className="w-full h-fit px-2 bg-green-950 z-10 m-auto">
      <div className="relative">
        <Slider {...settings}>
          {slides.map((slide, index) => (
            <div
              key={index}
              className="flex justify-center items-center px-1 overflow-hidden"
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-contain object-center sm:h-[400px] md:h-[500px] rounded-xl shadow-md bg-transparent transition-transform duration-500 animate-zoom-in-out"
              />

            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default EventCarousel;
