import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const FilterSwiper = ({ allFilters, selectedFilter, onFilterChange }) => {
  const [hoveredFilter, setHoveredFilter] = useState(null);
  const timeoutRef = useRef(null);

  const handleMouseEnter = (filterClass) => {
    timeoutRef.current = setTimeout(() => {
      setHoveredFilter(filterClass);
    }, 500);
  };

  const handleMouseLeave = () => {
    clearTimeout(timeoutRef.current);
    setHoveredFilter(null);
  };

  return (
    <Swiper
      spaceBetween={4}
      slidesPerView={6}
      centeredSlides={true}
      loop={true}
      grabCursor={true}
      breakpoints={{
        320: { slidesPerView: 3 },
        480: { slidesPerView: 4 },
        640: { slidesPerView: 5 },
        768: { slidesPerView: 6 },
        1024: { slidesPerView: 7 },
        1280: { slidesPerView: 8 },
      }}
      className="swiper-container text-nowrap bg-green-950 w-full relative mb-8" 
    >
      {allFilters.map(({ class: filterClass, label, icon }, index) => (
        <SwiperSlide key={index} className="swiper-slide cursor-pointer p-2 rounded-lg min-w-[250px]">
          <div
            className={`relative p-1 rounded-lg text-center font-semibold flex flex-row gap-2 items-center justify-center ${
              selectedFilter === filterClass ? "bg-white text-green-950" : "bg-green-700 text-white"
            }`}
            onClick={() => onFilterChange(filterClass)}
            onMouseEnter={() => handleMouseEnter(filterClass)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="text-xl mb-1">{icon}</div>
            <div className="text-sm">{label}</div>

            {/* Tooltip shown after 1s */}
            {selectedFilter === filterClass && hoveredFilter === filterClass && (
              <div className="absolute top-[-20px] right-[-20px] w-fit h-fit p-1 bg-white text-green-950 text-[10px] rounded shadow z-10 visible">
                Click lần nữa để bỏ chọn Filter.
              </div>
            )}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default FilterSwiper;
