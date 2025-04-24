import React, { useState, useEffect } from "react";
import api from "../../config/api";
import EventCarousel from "../../components/SlidingCarousel/SlidingCarousel"
import BookingBar from "../../components/BookingBar/BookingBar";
import LoadingEffect from "../../components/LoadingEffect/LoadingEffect";
import PizzaCollection from "../../components/PizzaCollection/PizzaCollection";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const res = await api.get("/pizza/");
        setPizzas(res.data || []);
        setLoading(false);
      } catch (err) {
        console.log("Failed to load pizzas:", err);
        setLoading(false);
      }
    };
    fetchPizzas();
  }, []);

  return (
    <div>
      {loading && <LoadingEffect />}
      <EventCarousel />
      <BookingBar />
      <PizzaCollection pizzas={pizzas}/>
    </div>
  );
};

export default Home;
