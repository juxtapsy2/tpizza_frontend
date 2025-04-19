import React, { useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { pizzaClasses } from "../../constants"; 
import PizzaCard from './PizzaCard';

const PizzaCollection = ({ pizzas }) => {
  const [showMore, setShowMore] = useState(false);
  const [filteredClass, setFilteredClass] = useState("");

  const handleClassFilter = (selectedClass) => {
    if (filteredClass === selectedClass) {
      setFilteredClass(""); // Clear filter
    } else {
      setFilteredClass(selectedClass);
    }
  };

  const filteredPizzas = filteredClass
    ? pizzas.filter((pizza) => pizza.class.includes(filteredClass))
    : pizzas;

  const displayedPizzas = showMore ? filteredPizzas : filteredPizzas.slice(0, 4);

  return (
    <section className="bg-white text-green-950 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <h2 className="text-3xl font-bold mb-8 text-center">Ở Đây Chúng Tôi Có</h2>

        {/* Filter section with carousel */}
        <div className="mb-8">
          <Swiper
            spaceBetween={4}
            slidesPerView={6}  // Show 6 items in view
            centeredSlides={true}
            loop={true}
            grabCursor={true}
            className="swiper-container text-nowrap"
          >
            {Object.keys(pizzaClasses).map((classType, index) => (
              <SwiperSlide key={index} className="swiper-slide cursor-pointer p-2 rounded-lg">
                <div
                  className={`p-1 rounded-lg text-center font-semibold ${filteredClass === classType ? "bg-yellow-400" : "bg-green-500"}`}
                  onClick={() => handleClassFilter(classType)}
                >
                  {pizzaClasses[classType]}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Pizza Grid with white background for contrast */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayedPizzas.map((pizza, index) => (
            <PizzaCard key={index} pizza={pizza} />
          ))}
        </div>

        {/* See more button */}
        {filteredPizzas.length > 4 && (
          <button
            onClick={() => setShowMore(!showMore)}
            className="mt-6 bg-yellow-500 text-black font-semibold py-2 px-4 rounded-lg block mx-auto"
          >
            {showMore ? "Thu gọn" : "Xem thêm"}
          </button>
        )}
      </div>
    </section>
  );
};

export default PizzaCollection;
