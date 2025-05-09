import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../config/api";
import { getAllPizzasGate } from "../routes/APIGates";

const PizzaContext = createContext();

export const PizzaProvider = ({ children }) => {
  const [pizzas, setPizzas] = useState([]);
  const fetchPizzas = async () => {
    try {
      const res = await api.get(getAllPizzasGate);
      setPizzas(res.data);
    } catch (err) {
      console.error("Failed to fetch pizzas:", err);
    }
  };

  useEffect(() => {
    fetchPizzas();
  }, []);

  return (
    <PizzaContext.Provider value={{ pizzas, fetchPizzas }}>
      {children}
    </PizzaContext.Provider>
  );
};

export const usePizzas = () => useContext(PizzaContext);
