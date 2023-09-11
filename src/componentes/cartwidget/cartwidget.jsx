import React from "react";
import cart from "./assets/cart.svg";

const CartWidget = ({ cartCount }) => {
  return (
    <div>
      <img src={cart} alt="cart-widget" />
      {cartCount > 0 && <span>{cartCount}</span>}
    </div>
  );
};

export default CartWidget;
