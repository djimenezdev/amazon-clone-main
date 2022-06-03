import React, { memo } from 'react';
import '../Styling/BasketItem.css';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromBasket, getBasket } from '../slices/basketSlice';

const BasketItem = ({
  basketImage,
  itemTitle,
  itemPrice,
  itemRating,
  itemId,
  hideButton,
}) => {
  const basket = useSelector(getBasket);
  const dispatch = useDispatch();
  let basketCopy = [...basket];
  const removeFromBasketM = (id) => {
    basketCopy.splice(
      basketCopy.findIndex((obj) => obj.id === id),
      1
    );
    dispatch(removeFromBasket({ items: basketCopy }));
  };
  return (
    <div className='basketItem'>
      <img className='basketItem__image' src={basketImage} alt='' />
      <div className='basketItem__info'>
        <h2 className='basketItem__title'>{itemTitle}</h2>
        <p className='basketItem__price'>
          <small>$</small>
          <strong>{itemPrice}</strong>
        </p>
        <div className='basketItem__rating'>
          {Array.from({ length: itemRating }, () => (
            <p key={Math.random()}>
              <span role='img' aria-label='star rating symbol'>
                🌟
              </span>
            </p>
          ))}
        </div>
        {!hideButton && (
          <button type='button' onClick={() => removeFromBasketM(itemId)}>
            Remove from basket
          </button>
        )}
      </div>
    </div>
  );
};

const checkProps = (prevProduct, nextProduct) => {
  if (
    prevProduct.basketImage === nextProduct.basketImage &&
    prevProduct.itemTitle === nextProduct.itemTitle &&
    prevProduct.itemId === nextProduct.itemId &&
    prevProduct.hideButton === nextProduct.hideButton &&
    prevProduct.itemPrice === nextProduct.itemPrice &&
    prevProduct.itemRating === nextProduct.itemRating
  ) {
    return (
      prevProduct.basketImage === nextProduct.basketImage &&
      prevProduct.itemTitle === nextProduct.itemTitle &&
      prevProduct.itemId === nextProduct.itemId &&
      prevProduct.hideButton === nextProduct.hideButton &&
      prevProduct.itemPrice === nextProduct.itemPrice &&
      prevProduct.itemRating === nextProduct.itemRating
    );
  } else {
    return false;
  }
};

export default memo(BasketItem, checkProps);
