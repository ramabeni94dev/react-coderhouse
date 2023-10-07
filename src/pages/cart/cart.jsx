import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import { Container, Row, Col, ListGroup, Image, Button } from "react-bootstrap";
import OrderForm from "./OrderForm"; // Importa el componente OrderForm
import "./cart.css";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cartItems, removeItem, emptyCart } = useCart(); // Agrega clearCart para vaciar el carrito
  const [showOrderForm, setShowOrderForm] = useState(false);

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <Container className="cart-container">
      <h2 className="cart-title">Carrito de Compras</h2>
      {cartItems.length === 0 ? (
        <p className="cart-empty-message">El carrito de compras está vacío.</p>
      ) : (
        <>
          {showOrderForm ? (
            <OrderForm onClose={() => setShowOrderForm(false)} />
          ) : (
            <>
              <ListGroup className="cart-list">
                {cartItems.map((item) => (
                  <ListGroup.Item key={item.id} className="cart-item">
                    <Row>
                      <Col xs={4} md={3}>
                        <Image
                          src={item.image}
                          alt={item.title}
                          className="cart-item-image"
                        />
                      </Col>
                      <Col xs={8} md={9}>
                        <h3 className="cart-item-title">{item.title}</h3>
                        <p className="cart-item-quantity">
                          Cantidad: {item.quantity}
                        </p>
                        <p className="cart-item-price">
                          Precio por unidad ${item.price}
                        </p>
                        <Button
                          onClick={() => removeItem(item.id)}
                          className="cart-item-remove"
                        >
                          Eliminar
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <div className="cart-summary">
                <p className="cart-total">Total: ${calculateTotal()}</p>
                <button onClick={() => emptyCart()} className="btn btn-danger">
                  Vaciar Carrito
                </button>

                {/* Botón para vaciar el carrito */}
                <Link to="/OrderForm">
                  <button className="btn btn-primary cart-generate-order">
                    Generar Orden
                  </button>
                </Link>
              </div>
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default Cart;
