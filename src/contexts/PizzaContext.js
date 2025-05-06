import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../config/api";

const PizzaContext = createContext();

export const PizzaProvider = ({ children }) => {
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const res = await api.get("/pizza/");
        setPizzas(res.data);
      } catch (err) {
        console.error("Failed to fetch pizzas:", err);
      }
    };

    fetchPizzas();
  }, []);

  return (
    <PizzaContext.Provider value={{ pizzas }}>
      {children}
    </PizzaContext.Provider>
  );
};

export const usePizzas = () => useContext(PizzaContext);
