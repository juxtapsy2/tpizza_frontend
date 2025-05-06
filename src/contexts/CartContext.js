import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { PIZZA_PRICES } from '../constants';
import { usePizzas } from './PizzaContext';

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { pizzas } = usePizzas();
  const [cartItems, setCartItems] = useState(() => {
    const storedItems = localStorage.getItem("cartItems");
    return storedItems ? JSON.parse(storedItems) : [];
  });
  const [cartCount, setCartCount] = useState(0);

  const getCartCount = () => cartItems.length;

  const getPizzaById = (id) => pizzas.find(p => p._id === id);

  useEffect(() => {
    // Calculate the total number of items (based on quantity)
    const totalItems = getCartCount();
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    localStorage.setItem("cartCount", JSON.stringify(totalItems));
  }, [cartItems]);

  const addToCart = (pizza, quantity = 1) => {
    // Check if the pizza is already in the cart
    const existingPizzaIndex = cartItems.findIndex(
      (item) =>
        item.id === pizza.id &&
        item.size === pizza.size &&
        item.crustStyle === pizza.crustStyle
    );

    if (existingPizzaIndex >= 0) {
      // If the pizza exists, increase the quantity by the passed quantity
      setCartItems((prevItems) => {
        const updatedItems = [...prevItems];
        updatedItems[existingPizzaIndex].quantity += quantity;
        return updatedItems;
      });
    } else {
      // If the pizza doesn't exist, add a new entry with the selected quantity
      setCartItems((prevItems) => [
        ...prevItems,
        { ...pizza, quantity, price: calculatePrice(pizza.size, pizza.crustStyle) }
      ]);
    }
  };

  const updateItem = (index, newData) => {
    setCartItems(prev =>
      prev.map((item, i) => (i === index ? { ...item, ...newData } : item))
    );
  };

  const increaseQuantity = useCallback((index) => { //useCallback(fn, deps) memoizes a function — it remembers the function between renders unless its dependencies change. Without useCallback, a new instance of function (e.g. increaseQuantity) is created on every render. => +2 instead of just +1
    setCartItems((prevItems) => {
      const updatedItems = [...prevItems];
      if (updatedItems[index]) {
        updatedItems[index] = {
          ...updatedItems[index],
          quantity: updatedItems[index].quantity + 1,
        };
      }
      return updatedItems;
    });
  }, []);

  const decreaseQuantity = useCallback((index) => {
    setCartItems((prevItems) => {
      const updatedItems = [...prevItems];
      if (updatedItems[index].quantity > 1) {
        updatedItems[index] = {
          ...updatedItems[index],
          quantity: updatedItems[index].quantity - 1,
        }
      }
      return updatedItems;
    });
  }, []);

  const removeItem = (index) => {
    setCartItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems.splice(index, 1);
      return updatedItems;
    });
  };

  const calculatePrice = (item) => {
    const basePrice = PIZZA_PRICES[`${item.size}-${item.crustStyle}`] || 0;
    const toppingsList = Array.isArray(item.toppings) ? item.toppings : [];
    const toppingsPrice = toppingsList.reduce((total, toppingName) => {
      const topping = getPizzaById(item.id)?.toppings?.find((t) => t.name === toppingName);
      return total + (topping?.price || 0);
    }, 0);
    return basePrice + toppingsPrice;
  };  

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      return total + calculatePrice(item) * item.quantity;
    }, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount: getCartCount(),
        getPizzaById,
        addToCart,
        updateItem,
        increaseQuantity,
        decreaseQuantity,
        removeItem,
        setCartItems,
        calculatePrice,
        calculateTotalPrice
      }}
    >
      {children}
    </CartContext.Provider>
  );
};