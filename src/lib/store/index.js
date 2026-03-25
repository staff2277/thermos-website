"use client";

import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export function AppProvider({ children }) {
  // --- AUTH STATE ---
  const [user, setUser] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  // --- CART STATE ---
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Initialization
  useEffect(() => {
    const savedUser = localStorage.getItem("thermos_user");
    const savedCart = localStorage.getItem("thermos_cart");

    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedCart) setCart(JSON.parse(savedCart));
    
    setIsAuthLoading(false);
  }, []);

  // Update storage on changes
  useEffect(() => {
    if (!isAuthLoading) {
      if (user) {
        localStorage.setItem("thermos_user", JSON.stringify(user));
      } else {
        localStorage.removeItem("thermos_user");
      }
    }
  }, [user, isAuthLoading]);

  useEffect(() => {
    localStorage.setItem("thermos_cart", JSON.stringify(cart));
  }, [cart]);

  // Actions
  const login = (userData) => {
    // Simulated JWT login
    setUser({
      ...userData,
      token: "mock-jwt-token-" + Date.now(),
      joined: new Date().toLocaleDateString()
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("thermos_user");
  };

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.selectedColor === product.selectedColor);
      if (existing) {
        return prev.map(item => 
          item.id === product.id && item.selectedColor === product.selectedColor
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id, color) => {
    setCart(prev => prev.filter(item => !(item.id === id && item.selectedColor === color)));
  };

  const updateCartQuantity = (id, color, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id && item.selectedColor === color) {
        const newQuantity = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const cartTotal = cart.reduce((acc, item) => {
    const priceStr = item.price.replace(/[^0-9.]/g, '');
    return acc + (parseFloat(priceStr) * item.quantity);
  }, 0);

  return (
    <AppContext.Provider value={{
      user, login, logout, isAuthLoading,
      cart, addToCart, removeFromCart, updateCartQuantity, cartTotal, 
      isCartOpen, setIsCartOpen
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppStore() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppStore must be used within an AppProvider");
  return context;
}
