import React, { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';

import { ReactComponent as Logo } from '../../assets/bike.svg';
import { auth } from '../../firebase/firebase.utils';
import { User, RootState } from '../../types/redux.types';

import CartIcon from '../cart-icon/cart-icon.components';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';

import "./header.styles.scss";

// Props received from Redux connect
type HeaderProps = ConnectedProps<typeof connector>;

// Header component - displays the top navigation bar with logo, links and cart icon
const Header: FC<HeaderProps> = ({ currentUser, hidden }) => (
  <div className="header-container">
    <Link className="logo-container" to="/">
      <Logo className="logo" />
    </Link>

    <div className="options-container">
      <Link className="option-link" to="/shop">SHOP</Link>
      <Link className="option-link" to="/contact">CONTACT</Link>
      {currentUser ? (
        <button className="option-link" onClick={() => auth.signOut()}>
          SIGN OUT
        </button>
      ) : (
        <Link className="option-link" to="/signin">SIGN IN</Link>
      )}
      <CartIcon />
    </div>
    {hidden ? null : <CartDropdown />}
  </div>
);

// Maps Redux state to component props using reselect
const mapStateToProps = createStructuredSelector<
  RootState,
  {
    currentUser: User | null;
    hidden: boolean;
  }
>({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden,
});

// Create connector
const connector = connect(mapStateToProps);

export default connector(Header);
