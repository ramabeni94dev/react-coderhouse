import React from "react";

function ExampleCarouselImage({ images, activeIndex }) {
  return (
    <img
      className="d-block w-100"
      src={images[activeIndex]}
      alt={`Slide ${activeIndex + 1}`}
    />
  );
}

export default ExampleCarouselImage;
