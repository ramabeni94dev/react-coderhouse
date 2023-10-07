import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]); // Un array para almacenar los productos en el carrito

  const addToCart = (count) => {
    setCartCount((prevCount) => prevCount + count);
  };

  const addItemToCart = (product) => {
    const existingProductIndex = cartItems.findIndex(
      (item) => item.id === product.id
    );

    if (existingProductIndex !== -1) {
      // Si el producto ya está en el carrito, actualiza su cantidad
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingProductIndex].quantity += product.quantity;
      setCartItems(updatedCartItems);
    } else {
      // Si el producto no está en el carrito, agrégalo con su cantidad
      setCartItems([...cartItems, product]);
    }

    // Calcula la cantidad total en el carrito basándote en el nuevo estado de cartItems
    const totalQuantity = cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
    setCartCount(totalQuantity);
    console.log(totalQuantity);
  };

  // Eliminar un producto del carrito
  const removeItem = (itemId) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
    const removedProduct = cartItems.find((item) => item.id === itemId);

    if (removedProduct) {
      setCartItems(updatedCartItems);
      setCartCount(cartCount - removedProduct.quantity);
    }
  };

  const emptyCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartCount,
        addToCart,
        cartItems,
        addItemToCart,
        removeItem,
        emptyCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
