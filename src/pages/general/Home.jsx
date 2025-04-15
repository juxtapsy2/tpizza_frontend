import React from "react";
import EventCarousel from "../../components/SlidingCarousel/SlidingCarousel"
import BookingBar from "../../components/BookingBar/BookingBar";

const Home = () => {
  return (
    <div>
      <EventCarousel />
      <BookingBar />
    </div>
  );
};

export default Home;
