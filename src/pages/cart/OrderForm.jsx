import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../services/firebase/firebaseConfig";
import "./cart.css";

const OrderForm = ({ onClose }) => {
  const { cartItems, emptyCart } = useCart(); // Obtiene emptyCart del contexto de carrito
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const orderData = {
      name,
      email,
      phone,
      items: cartItems,
      total: calculateTotal(),
      timestamp: new Date().toISOString(),
    };

    try {
      const docRef = await addDoc(collection(db, "orders"), orderData);
      console.log("Orden generada con ID:", docRef.id);
      setOrderId(docRef.id);
      setOrderSuccess(true);

      // Llama a emptyCart para vaciar el carrito después de generar la orden con éxito
      emptyCart();
    } catch (error) {
      console.error("Error al generar la orden:", error);
    }
  };

  return (
    <Container>
      <h2>Generar Orden</h2>
      {orderSuccess ? (
        <Alert variant="success">
          Orden generada con éxito. El ID de la orden es: {orderId}
        </Alert>
      ) : (
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresa tu nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Correo Electrónico</Form.Label>
            <Form.Control
              type="email"
              placeholder="Ingresa tu correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="phone">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
              type="tel"
              placeholder="Ingresa tu teléfono"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </Form.Group>
          <Button type="submit">Generar Orden</Button>
        </Form>
      )}
    </Container>
  );
};

export default OrderForm;
