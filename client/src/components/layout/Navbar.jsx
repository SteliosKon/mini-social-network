import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import Icon from '../../img/favicon.png';

//  CSS
import '../../App.css';

const Navbar = ({
  auth: { isAuthenticated, loading },
  logout,
  history: {
    location: { pathname },
  },
}) => {
  const authLinks = (
    <ul>
      <li>
        <Link to="/posts">Posts</Link>
      </li>
      <li>
        <Link to="/dashboard">
          <span className="hide-sm">Dashboard</span>
        </Link>
      </li>
      <li>
        <Link to="/profiles">Profiles</Link>
      </li>
      <li>
        <a onClick={logout} href="#!">
          <i className="fas fa-sign-out-alt"></i>{' '}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </ul>
  );
  const guestLinks = (
    <ul>
      <li>
        <Link to="/profiles">Profiles</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );

  return (
    <Fragment>
      {pathname === '/login' ||
      pathname === '/register' ||
      pathname === '/' ? null : (
        <Fragment>
          <nav className="navbar bg-dark">
            <h1>
              <img src={Icon} className="navbar-icon" alt="Logo" />
              <Link to="/">Vecto</Link>
            </h1>
            {!loading && (
              <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
            )}
          </nav>
        </Fragment>
      )}
    </Fragment>
  );
};
Navbar.mapStateToProps = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default withRouter(connect(mapStateToProps, { logout })(Navbar));
