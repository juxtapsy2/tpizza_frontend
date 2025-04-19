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
      centeredSlides={false}
      loop={false}
      grabCursor={true}
      className="swiper-container text-nowrap bg-green-950 w-full relative mb-8 overflow-visible"
      breakpoints={{
        320: { slidesPerView: 3 },
        480: { slidesPerView: 4 },
        640: { slidesPerView: 5 },
        768: { slidesPerView: 6 },
        1024: { slidesPerView: 7 },
        1280: { slidesPerView: 8 },
      }}
    >
      {allFilters.map(({ class: filterClass, label, icon }, index) => (
        <SwiperSlide key={index} className="swiper-slide">
          <div
            className={`relative px-2 py-1 rounded-lg text-center font-semibold flex flex-col items-center justify-center transition-all duration-200
              ${selectedFilter === filterClass ? "bg-white text-green-950" : "bg-green-700 text-white"}`}
            onClick={() => onFilterChange(filterClass)}
            onMouseEnter={() => setHoveredFilter(filterClass)}
            onMouseLeave={() => setHoveredFilter(null)}
          >
            <div className="text-lg sm:text-xl mb-1">{icon}</div>
            <div className="text-xs sm:text-sm text-center whitespace-nowrap">{label}</div>
        
            {/* Tooltip (optional) */}
            {selectedFilter === filterClass && hoveredFilter === filterClass && showTooltip && (
              <div className="absolute -top-8 right-0 text-[10px] bg-green-800 text-white px-2 py-1 rounded z-50 shadow">
                Click lần nữa để bỏ chọn
              </div>
            )}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default FilterSwiper;
