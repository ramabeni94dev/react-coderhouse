import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import cart from "./assets/cart.svg";
import { useCart } from "../../context/CartContext";

const CartWidget = () => {
  const { cartItems } = useCart(); // Obtén los elementos del carrito desde el contexto

  // Calcula la cantidad total sumando las cantidades de todos los elementos en el carrito
  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  useEffect(() => {
    console.log("Total Quantity:", totalQuantity);
  }, [cartItems]); // Actualiza cuando cambian los elementos del carrito

  return (
    <div>
      <Link to="/cart">
        {/* Enlace a la página del carrito */}
        <img src={cart} alt="cart-widget" />
        {totalQuantity > 0 && <span>{totalQuantity}</span>}
      </Link>
    </div>
  );
};

export default CartWidget;
