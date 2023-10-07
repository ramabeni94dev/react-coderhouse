import React from "react";
import { useCart } from "../../context/CartContext";
import "./cart.css";
import { Container, Row, Col, ListGroup, Image, Button } from "react-bootstrap";

const Cart = () => {
  const { cartItems, removeItem } = useCart(); // Obtén la lista de productos y la cantidad total desde el contexto del carrito

  // Función para calcular la suma total de los productos en el carrito
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
          </div>
        </>
      )}
    </Container>
  );
};

export default Cart;
