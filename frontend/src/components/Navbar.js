import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';
import {
  setSelectedUser,
  toggleProfileModal,
} from '../features/users/usersSlice';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/login');
  };
  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          <Link to="/">Posty</Link>
        </div>
        <ul>
          {user ? (
            <>
              <li
                onClick={() => {
                  dispatch(setSelectedUser(user));
                  dispatch(toggleProfileModal());
                }}
              >
                Profile
              </li>
              <li>
                <Link to="/" onClick={onLogout}>
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
