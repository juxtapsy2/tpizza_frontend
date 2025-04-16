import React, { useState, useEffect } from "react";
import EventCarousel from "../../components/SlidingCarousel/SlidingCarousel"
import BookingBar from "../../components/BookingBar/BookingBar";
import LoadingEffect from "../../components/LoadingEffect/LoadingEffect";

const Home = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  return (
    <div>
      {loading && <LoadingEffect />}
      <EventCarousel />
      <BookingBar />
    </div>
  );
};

export default Home;
