import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../App.css'

const WebHeader = (props) => {
  const { currentUser } = useSelector((state) => state.user);

  return (
      <div className="col">
        <h1 className="header-container">
          <span>{props.header}</span>
          <Link to="/home" className="btn btn-link home-link">Home</Link>
          {currentUser ? (
              <>
                <Link to="/profile" className="btn btn-link home-link">Profile</Link>
                <span className="welcome-message extra-small italic">Welcome, {currentUser.username}!</span>
                <Link to="/search" className="btn btn-link home-link search-link">Search</Link>
                
              </>
          ) : (
               <>
                 <Link to="/login" className="btn btn-link home-link">Login</Link>
                 <Link to="/register" className="btn btn-link home-link">Register</Link>
                 <Link to="/search" className="btn btn-link home-link search-link">Search</Link>
               </>
           )}
        </h1>
      </div>
  );
};

export default WebHeader;
