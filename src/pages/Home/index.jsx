import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Card, Button } from "react-bootstrap";

const Home = () => {
  return (
    <div>
      <Container className="mt-5">
        <Card>
          <Card.Body>
            <Card.Title>Bienvenido a Mi Sitio Web</Card.Title>
            <Card.Text>
              Este es un ejemplo de una página de inicio utilizando React y
              React Bootstrap.
            </Card.Text>
            <Button variant="primary">¡Empezar!</Button>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Home;
