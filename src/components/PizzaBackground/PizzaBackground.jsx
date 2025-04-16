// src/components/PizzaBackground.jsx
import React, { useEffect, useState } from "react";

const PizzaBackground = () => {
  const [randomPizzas, setRandomPizzas] = useState([]);

  useEffect(() => {
    const getRandomPizzas = (amount) => {
      return Array.from({ length: amount }).map((_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: 1 + Math.random() * 2,
        opacity: 0.05 + Math.random() * 0.05,
        rotate: Math.random() * 360,
      }));
    };
    setRandomPizzas(getRandomPizzas(80));
  }, []);

  return (
    <div className="absolute inset-0 z-0">
      {randomPizzas.map((pizza) => (
        <div
          key={pizza.id}
          className="absolute select-none pointer-events-none"
          style={{
            top: `${pizza.top}%`,
            left: `${pizza.left}%`,
            fontSize: `${pizza.size}rem`,
            opacity: pizza.opacity,
            transform: `rotate(${pizza.rotate}deg)`,
          }}
        >
          🍕
        </div>
      ))}
    </div>
  );
};

export default PizzaBackground;
