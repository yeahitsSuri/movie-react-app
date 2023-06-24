import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const WebHeader = (props) => {
  return (
    <div className="col">
      <h1>
        <span>{props.header}</span>
        <Link to="/home" className="btn btn-link home-link" style={{ marginLeft: '10px'}}>Home</Link>
        <Link to="/login" className="btn btn-link home-link">Login</Link>
        <Link to="/register" className="btn btn-link home-link">Register</Link>
      </h1>
    </div>
  );
};

export default WebHeader;
