import React, { useState } from "react";

function Counter({ addToCart }) {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  const handleAddToCart = () => {
    addToCart(count);
  };

  return (
    <div className="d-flex align-items-center">
      <button
        className="btn btn-sm btn-secondary me-2"
        onClick={handleDecrement}
      >
        -
      </button>
      <span className="me-2">{count}</span>
      <button
        className="btn btn-sm btn-secondary me-2"
        onClick={handleIncrement}
      >
        +
      </button>
      <button className="btn btn-sm btn-primary" onClick={handleAddToCart}>
        Add to Cart
      </button>
    </div>
  );
}

export default Counter;
