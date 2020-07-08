import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import ContactContext from '../../context/contact/contactContext';

const Navbar = ({ title, icon }) => {
  const authContext = useContext(AuthContext);
  const contactContext = useContext(ContactContext);

  const { clearContacts } = contactContext;

  const { isAuthenticated, logout, user } = authContext;

  const onLogout = () => {
    logout();
    clearContacts();
  };

  const authLinks = (
    <Fragment>
      <li>Hello {user && user.name}</li>
      <li>
        <a onClick={onLogout} href='/'>
          <i className='fas fa-sign-out-alt'></i>
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <NavLink
          activeStyle={{
            borderBottom: 'solid 3px #fff',
            paddingBottom: '0.5em',
          }}
          exact
          to='/register'
        >
          Register
        </NavLink>
      </li>
      <li>
        <NavLink
          activeStyle={{
            borderBottom: 'solid 3px #fff',
            paddingBottom: '0.5em',
          }}
          exact
          to='/login'
        >
          Login
        </NavLink>
      </li>
    </Fragment>
  );
  return (
    <div className='navbar bg-primary'>
      <h1>
        <i className={icon} /> {title}
      </h1>
      <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

Navbar.defaultProps = {
  title: 'Contact Keeper',
  icon: 'fas fa-id-card-alt',
};

export default Navbar;

/* 
potential navLinks
<li>
          <NavLink
            activeStyle={{
              borderBottom: 'solid 3px #fff',
              paddingBottom: '0.5em',
            }}
            exact
            to='/'
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            activeStyle={{
              borderBottom: 'solid 3px #fff',
              paddingBottom: '0.5em',
            }}
            exact
            to='/about'
          >
            About
          </NavLink>
        </li>
        <li>
          <NavLink
            activeStyle={{
              borderBottom: 'solid 3px #fff',
              paddingBottom: '0.5em',
            }}
            exact
            to='/register'
          >
            Register
          </NavLink>
        </li>
        <li>
          <NavLink
            activeStyle={{
              borderBottom: 'solid 3px #fff',
              paddingBottom: '0.5em',
            }}
            exact
            to='/login'
          >
            Login
          </NavLink>
        </li>

*/
