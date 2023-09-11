import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import CartWidget from "../../componentes/cartwidget/cartwidget";
import { Link } from "react-router-dom";

import { useCart } from "../../context/CartContext";

const routes = [
  {
    path: "/",
    text: "Home",
  },
  {
    path: "/products",
    text: "Products",
  },
  {
    path: "/my-account",
    text: "My account",
  },
];

function CollapsibleExample() {
  // Usa el hook useCart para acceder al contexto del carrito
  const { cartCount } = useCart();

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="home">Tienda de juegos</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {routes.map((route) => (
              <li className="nav-item" key={route.path}>
                <Link to={route.path} className="nav-link">
                  {route.text}
                </Link>
              </li>
            ))}
          </Nav>
          {/* Coloca el componente Counter aquí */}

          <CartWidget cartCount={cartCount} />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CollapsibleExample;
