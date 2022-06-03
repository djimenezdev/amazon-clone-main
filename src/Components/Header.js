import React from 'react';
import '../Styling/Header.css';
import SearchIcon from '@material-ui/icons/Search';
import { ShoppingBasket } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { userAuth } from '../firebase';
import { Flipper, Flipped } from 'react-flip-toolkit';
import { useSelector, useDispatch } from 'react-redux';
import { getBasket } from '../slices/basketSlice';
import { getEmail, displayEmail } from '../slices/loginSlice';
import { allOrders, getOrders } from '../slices/orderSlice';

const Header = ({ cAniState }) => {
  const basket = useSelector(getBasket);
  const email = useSelector(getEmail);
  const orders = useSelector(getOrders);
  const dispatch = useDispatch();

  const signOutEmail = () => {
    if (email !== 'Hello Guest') {
      userAuth.signOut();
      dispatch(allOrders({ items: [] }));
      dispatch(displayEmail({ userEmail: 'Hello Guest' }));
    }
  };

  return (
    <Flipper flipKey={cAniState}>
      <Flipped flipId='smoothHeader'>
        <div className={cAniState ? 'header' : ''}>
          <Link to='/'>
            <Flipped
              flipId='smoothImg'
              stagger='header-item'
              delayUntil='smoothHeader'
            >
              <img
                className={cAniState ? 'header__logo' : 'header__logoStart'}
                src='http://pngimg.com/uploads/amazon/amazon_PNG11.png'
                alt=''
              />
            </Flipped>
          </Link>{' '}
          <Flipped
            flipId='smoothSearch'
            stagger='header-item'
            delayUntil='smoothHeader'
          >
            <div
              className={cAniState ? 'header__search' : 'header__searchStart'}
            >
              <input className='header__searchInput' type='text' />
              <SearchIcon className='header__searchIcon' />
            </div>
          </Flipped>
          <div className='header__nav'>
            <Link to={email === 'Hello Guest' ? '/login' : '/'}>
              <Flipped
                flipId='smoothEmail'
                stagger='header-item'
                delayUntil='smoothHeader'
              >
                <div
                  onClick={signOutEmail}
                  className={
                    cAniState ? 'header__option' : 'header__optionStart'
                  }
                >
                  <span className='header__optionLineOne'>
                    {email === 'Hello Guest' ? email : 'Hello ' + email}
                  </span>
                  <span className='header__optionLineTwo'>
                    {email === 'Hello Guest' ? 'Sign in' : 'Sign out'}
                  </span>
                </div>
              </Flipped>
            </Link>
            {email && orders.length > 0 && (
              <Flipped
                flipId='smoothOrders'
                stagger='header-item'
                delayUntil='smoothHeader'
              >
                <Link to='/orders'>
                  <div
                    className={
                      cAniState ? 'header__option' : 'header__optionStart'
                    }
                  >
                    <span className='header__optionLineOne'>Returns</span>
                    <span className='header__optionLineTwo'>& orders</span>
                  </div>
                </Link>
              </Flipped>
            )}
            <Flipped
              flipId='smoothPrime'
              stagger='header-item'
              delayUntil='smoothHeader'
            >
              <div
                className={cAniState ? 'header__option' : 'header__optionStart'}
              >
                <span className='header__optionLineOne'>Your</span>
                <span className='header__optionLineTwo'>Prime</span>
              </div>
            </Flipped>
            <Link to='/checkout'>
              <Flipped
                flipId='smoothCheckout'
                stagger='header-item'
                delayUntil='smoothHeader'
              >
                <div
                  className={
                    cAniState
                      ? 'header__optionBasket'
                      : 'header__optionBasketStart'
                  }
                >
                  <ShoppingBasket />
                  <span className='header__optionLineTwo header__basketCount'>
                    {basket?.length}
                  </span>
                </div>
              </Flipped>
            </Link>
          </div>
        </div>
      </Flipped>
    </Flipper>
  );
};

export default Header;
