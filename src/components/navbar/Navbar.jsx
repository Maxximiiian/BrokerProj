import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

export default function Navbar({ authState, setAuthState }) {
  const location = useLocation();
  const navigate = useNavigate();
  const logoutHandler = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/v1/logout');
    if (response.ok) {
      setAuthState(null);
      navigate('/');
    }
    console.log(authState);
  };
  return (
    <>
      {!authState
        ? (
          <nav className="navbar zalupa fixed-top">
            <div className="container-fluid">
              <NavLink to="/" className="navbar-brand">Broker Stock</NavLink>
              <NavLink to="/auth" className="nav-link middle">Sign in</NavLink>
              <NavLink to="/registration" className="nav-link right">Registration</NavLink>
            </div>
          </nav>
        ) : (
          <nav className="navbar zalupa fixed-top">
            <div className="container-fluid">
              <NavLink to="/" className="navbar-brand">Broker Stock</NavLink>
              <h2 className="navbar-brand">
                Hello,
                {' '}
                {authState.name}
                !
              </h2>
              {/* <NavLink to="/home" className="nav-link left">Личный кабинет</NavLink> */}
              <button type="submit" onClick={logoutHandler} className="btn btn-danger">Log Out</button>
            </div>
          </nav>
        )}
    </>
  );
}
