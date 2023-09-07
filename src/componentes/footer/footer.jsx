import React from "react";

const Footer = () => {
  return (
    <footer className="bg-light text-dark text-center py-3">
      <div className="container">
        <p>
          &copy; {new Date().getFullYear()} Tu Nombre. Todos los derechos
          reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
