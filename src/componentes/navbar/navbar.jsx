import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Navbar from "react-bootstrap/Navbar";
import CartWidget from "../../componentes/cartwidget/cartwidget";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { getProducts } from "../../Productos";

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
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Función asíncrona para obtener los productos y categorías
    async function fetchProductsAndCategories() {
      try {
        const productsArray = await getProducts();
        if (Array.isArray(productsArray)) {
          const uniqueCategories = Array.from(
            new Set(productsArray.map((product) => product.category))
          );
          setCategories(uniqueCategories);
        } else {
          console.error("La variable 'products' no es un array.");
        }
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    }

    // Llama a la función para obtener los productos y categorías
    fetchProductsAndCategories();
  }, []);

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
            <NavDropdown title="Categorías" id="basic-nav-dropdown">
              {categories.map((category) => (
                <Link
                  key={category}
                  to={`/products/${category}`} // Asegúrate de usar /products/:category
                  className="dropdown-item"
                >
                  {category}
                </Link>
              ))}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        <CartWidget cartCount={cartCount} />
      </Container>
    </Navbar>
  );
}

export default CollapsibleExample;
