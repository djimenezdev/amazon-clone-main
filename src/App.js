import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './Components/Header';
import Home from './Components/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Checkout from './Components/Checkout';
import Login from './Components/Login';
import Spinner from 'react-bootstrap/Spinner';
import { Payment } from './Components/Payment';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { Orders } from './Components/Orders';
import { allOrders } from './slices/orderSlice';
import { useDispatch, useSelector } from 'react-redux';
import { db, userAuth } from './firebase';
import { getEmail } from './slices/loginSlice';

const promise = loadStripe(
  'pk_test_51L6V3aK3cdNfaJrMHVrF7MKJbnhsHMfCobtdEKxvk8RBP643f7NZQ5gaQ6ZEz9H7Tmsuq7BR3UHZhBSIJHaTB2wZ00wHQqDZ9a'
);

function App() {
  const [aniState, setAniState] = useState(false);
  const [spinState, setSpinState] = useState(false);
  const dispatch = useDispatch();
  const email = useSelector(getEmail);

  useEffect(() => {
    setTimeout(() => {
      setAniState(true);
    }, 1500);
    setTimeout(() => {
      setSpinState(true);
    }, 1000);
  }, []);

  useEffect(() => {
    if (!email || !userAuth?.currentUser) return;
    db.collection('users')
      .doc(userAuth.currentUser?.uid)
      .collection('orders')
      .orderBy('created', 'desc')
      .onSnapshot((snap) => {
        // setOrders(

        dispatch(
          allOrders({
            items: snap.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            })),
          })
        );

        // );
      });
  }, [email, dispatch]);
  return (
    <Router>
      <div className='app'>
        <Switch>
          <Route path='/orders'>
            <Header cAniState={aniState} />
            <Orders />
          </Route>
          <Route path='/login'>
            <Header cAniState={aniState} />
            <Login />
          </Route>
          <Route path='/checkout'>
            <Header cAniState={aniState} />
            <Checkout />
          </Route>
          <Route path='/payment'>
            <Header cAniState={aniState} />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>

          {/* Make sure default route is always at bottom.  */}
          <Route path='/'>
            {spinState === true ? (
              <>
                <Header cAniState={aniState} />
                <Home cAniState={aniState} />
              </>
            ) : (
              <Spinner animation='border' variant='info'>
                <h1 style={{ textAlign: 'center' }}>
                  Amazon clone is loading...
                </h1>
              </Spinner>
            )}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
