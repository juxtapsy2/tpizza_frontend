import React, { useState } from "react";
import { pizzaClasses } from "../../constants"; // Updated pizzaClasses import
import PizzaCard from "./PizzaCard";
import FilterSwiper from "../FilterSwiper/FilterSwiper";
import { GiFullPizza } from "react-icons/gi";

const PizzaCollection = ({ pizzas }) => {
  const [showMore, setShowMore] = useState(false);
  const [filteredClass, setFilteredClass] = useState("");

  // Extract unique pizza classes from data
  const uniqueClasses = [
    ...new Set(pizzas.flatMap((pizza) => pizza.class)),
  ];
  const allClasses = uniqueClasses.map((classKey) => {
    const predefinedClass = pizzaClasses.find((item) => item.class === classKey);
    return {
      class: classKey,
      label: predefinedClass?.label || `Pizza ${classKey}`, // Fallback label
      icon: predefinedClass?.icon || <GiFullPizza />, // Fallback icon
    };
  });

  const handleClassFilter = (selectedClass) => {
    setFilteredClass((prev) => (prev === selectedClass ? "" : selectedClass));
  };

  const filteredPizzas = filteredClass
    ? pizzas.filter((pizza) => pizza.class.includes(filteredClass))
    : pizzas;

  const displayedPizzas = showMore ? filteredPizzas : filteredPizzas.slice(0, 4);

  return (
    <section className="bg-white text-green-950 py-10 px-4">
      <h2 className="text-3xl font-bold mb-8 text-center max-w-7xl mx-auto overflow-visible relative">
        Ở Đây Chúng Tôi Có
      </h2>
      {/* Full-width Filter Swiper */}
      <div className="-mx-4">
        <FilterSwiper
          allFilters={allClasses} // Passing the filtered classes with icon and label
          selectedFilter={filteredClass}
          onFilterChange={handleClassFilter}
        />
      </div>
      {/* Pizza Cards in centered container */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayedPizzas.map((pizza, index) => (
            <PizzaCard key={index} pizza={pizza} />
          ))}
        </div>

        {filteredPizzas.length > 4 && (
          <button
            onClick={() => setShowMore(!showMore)}
            className="mt-6 bg-yellow-400 text-green-950 font-semibold py-2 px-4 rounded-lg block mx-auto"
          >
            {showMore ? "Thu gọn" : "Xem thêm"}
          </button>
        )}
      </div>
    </section>
  );
};

export default PizzaCollection;
