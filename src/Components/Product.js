import React, { useState, useEffect, useRef } from "react";
import "../Styling/Product.css";
import { Flipped, Flipper, spring } from "react-flip-toolkit";
import { useDispatch } from "react-redux";
import { addToBasket } from "../slices/basketSlice";
const Product = ({ title, price, image, rating, index }) => {
  const dispatch = useDispatch();
  const [prodAni, setProdAni] = useState(false);

  const imageRef = useRef(null);

  useEffect(() => {
    const images = [...imageRef.current.querySelectorAll(".product__img")];

    setTimeout(() => {
      setProdAni(true);

      images.forEach((el, i) => {
        spring({
          config: "wobbly",
          values: {
            translateY: [-15, 0],
            opacity: [0, 1],
          },
          onUpdate: ({ translateY, opacity }) => {
            el.style.opacity = opacity;
            el.style.transform = `translateY(${translateY}px)`;
          },
          delay: i * 75,
        });
      });
    }, 1600);
  }, []);

  const addToBasketM = () => {
    dispatch(
      addToBasket({
        item: {
          id: Math.random() * 100,
          title: title,
          image: image,
          price: price,
          rating: rating,
        },
      })
    );
  };

  return (
    <Flipper className="product" flipKey={prodAni}>
      <div className={prodAni ? "product__info" : "product__infoStart"}>
        <Flipped flipId={`productTitle-${index}`} /* stagger="product-item" */>
          <p className={prodAni ? "product__title" : "product__titleStart"}>
            {title}
          </p>
        </Flipped>
        <Flipped
          flipId={`productPrice-${index}`}
          delayUntil={`productTitle-${index}`}
          // stagger="product-item"
        >
          <p className={prodAni ? "product__price" : "product__priceStart"}>
            <small>$</small>
            <strong>{price}</strong>
          </p>
        </Flipped>
        <Flipped flipId={`productStar-${index}`}>
          <div className="product__rating">
            {Array.from({ length: rating }, () => (
              <span
                role="img"
                aria-label="product star rating"
                key={Math.random() * 100}
                className={prodAni ? "product__star" : "product__starStart"}
              >
                🌟
              </span>
            ))}
          </div>
        </Flipped>
      </div>
      <div ref={imageRef}>
        <img className="product__img" src={image} alt="" />
      </div>
      <Flipped flipId={`addtoBasket-${index}`}>
        <button
          className={prodAni ? "addBasket__button" : "addBasket__buttonStart"}
          onClick={addToBasketM}
          type="button"
        >
          Add to Basket
        </button>
      </Flipped>
    </Flipper>
  );
};
export default Product;
