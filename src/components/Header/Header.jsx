import React, { Fragment } from 'react';
import user from '../../assets/default.jpg';
import { Link, NavLink, redirect, useNavigate } from 'react-router-dom';
import userpic from '../../assets/default.jpg';
import { ChatState } from '../../context/ChatProvider';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoIosPaper, IoMdChatboxes } from 'react-icons/io';
import { BsChatRightDotsFill } from 'react-icons/bs';
import { RiGroupFill } from 'react-icons/ri';
import { FaChessKing } from 'react-icons/fa';

import './Header.css';
// import "./tempheader.css";
// import { IoNewspaper } from "react-icons/io5";

const Menu = () => {
  return (
    <div className="menu">
      <NavLink to="/" className="menu-link">
        <IoIosPaper />
        CTFs
      </NavLink>
      <NavLink to="discussion" className="menu-link">
        <IoMdChatboxes />
        Discussion
      </NavLink>
      <NavLink to="chat" className="menu-link">
        <BsChatRightDotsFill />
        Chat
      </NavLink>
      <NavLink to="social" className="menu-link">
        <RiGroupFill />
        Social
      </NavLink>
      {/* <NavLink to="future-scope" className="menu-link">
        <FaChessKing />
        Contests
      </NavLink> */}
    </div>
  );
};

const Header = () => {
  const { user, setOpenProfile, openProfile, isUserLoggedIn } = ChatState();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    isUserLoggedIn.current = null;
    navigate('/login');
    toast.error('You have been logged out', {
      autoClose: 1000,
    });
  };

  return (
    <div className="header">
      <div className="header-main">
        <Link to="/" className="logo">
          {'CodeClash'}
        </Link>
        <Menu />
        <Link
          onClick={() => {
            setOpenProfile(!openProfile);
          }}
          to={`profile/${
            JSON.parse(localStorage.getItem('userInfo'))
              ? JSON.parse(localStorage.getItem('userInfo')).data.user.name
              : ''
          }`}
          className="user"
        >
          <div className="name">
            {user ? user.data.user.name : <Link to="/login">login</Link>}
          </div>
          {user ? (
            <img
              src={user ? user.data.user.photo : ''}
              alt="user"
              className="user-img"
            />
          ) : (
            ''
          )}
        </Link>
        <div onClick={handleLogout} style={{ cursor: 'pointer' }}>
          {isUserLoggedIn.current ? 'Logout' : ''}
        </div>
        <ToastContainer
          position="bottom-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </div>
  );
};

export default Header;
