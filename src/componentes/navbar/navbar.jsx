import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import CartWidget from "../cartwidget/cartwidget";

import { Link } from "react-router-dom";

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
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Tienda de juegos</Navbar.Brand>
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
          <Nav>
            <CartWidget />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CollapsibleExample;
