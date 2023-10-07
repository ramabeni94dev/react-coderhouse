import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Container className="mt-5">
        <Card>
          <Card.Body>
            <Card.Title>Bienvenido a Mi Sitio Web</Card.Title>
            <Card.Text>
              Tienda realizada con Bootstrap, para proyectofinal Coderhouse
            </Card.Text>

            <Link to={`/products`} className="mt-auto btn btn-custom btn-sm">
              <span>¡Empezar a comprar!</span>
            </Link>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Home;
