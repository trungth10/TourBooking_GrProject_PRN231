import React from "react";
import { Carousel } from "react-bootstrap";

const GuestCarousel = ({ tourImage }) => {
  return (
    <Carousel
      prevIcon={
        <span aria-hidden="true" className="fas fa-chevron-left text-black" />
      }
      nextIcon={
        <span aria-hidden="true" className="fas fa-chevron-right text-black" />
      }
    >
      {tourImage.destinationImages.map((image) => (
        <Carousel.Item key={image.id}>
          <img src={image.image} className="d-block w-100" alt="..." />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default GuestCarousel;
