import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import ExampleCarouselImage from "./ExampleCarouselImage"; // Asegúrate de ajustar la ruta

function UncontrolledExample() {
  const images = ["/images/ps5.jpg", "/images/steam.jpg", "/images/xbox.jpg"];

  const [activeIndex, setActiveIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setActiveIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={activeIndex} onSelect={handleSelect}>
      {images.map((image, index) => (
        <Carousel.Item key={index}>
          <ExampleCarouselImage images={images} activeIndex={index} />
          <Carousel.Caption>
            <h3>{`Slide ${index + 1} label`}</h3>
            {/* ... Puedes agregar más contenido aquí ... */}
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default UncontrolledExample;
