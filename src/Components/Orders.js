import React from 'react';
import { useSelector } from 'react-redux';
import { getOrders } from '../slices/orderSlice';
import '../Styling/Orders.css';
import { Order } from './Order';

export const Orders = () => {
  const orders = useSelector(getOrders);
  return (
    <div className='orders'>
      <h1>Your orders</h1>
      <div className='orders__order'>
        {orders?.map((order, key) => (
          <Order order={order} key={key + Math.random() * 900} />
        ))}
      </div>
    </div>
  );
};
