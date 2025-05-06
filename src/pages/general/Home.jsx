import React, { useState, useEffect } from "react";
import api from "../../config/api";
import EventCarousel from "../../components/SlidingCarousel/SlidingCarousel"
import BookingBar from "../../components/BookingBar/BookingBar";
import LoadingEffect from "../../components/LoadingEffect/LoadingEffect";
import PizzaCollection from "../../components/PizzaCollection/PizzaCollection";
import PizzaDetails from "../../components/PizzaDetails/PizzaDetails";
import { usePizzas } from "../../contexts/PizzaContext";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [selectedPizza, setSelectedPizza] = useState(null);
  const { pizzas } = usePizzas();

  useEffect(() => {
    if (pizzas) setLoading(false);
  }, [pizzas]);
  
  return (
    <div>
      {loading && <LoadingEffect />}
      <EventCarousel />
      <BookingBar />
      <PizzaCollection pizzas={pizzas} onBuyPizza={setSelectedPizza} />
      {selectedPizza && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center">
          {/* Overlay that closes modal on click */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-0"
            onClick={() => setSelectedPizza(null)}
          ></div>

          {/* Modal content above the overlay, prevents outside clicks */}
          <div
            className="relative z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <PizzaDetails
              pizza={selectedPizza}
              onClose={() => setSelectedPizza(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
