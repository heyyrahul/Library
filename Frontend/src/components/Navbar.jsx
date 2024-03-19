import React, { useState, useEffect } from 'react';
import '../Css/Navbar.css';
import { Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client'; 

const GET_USER = gql`
  query GetUser {
    me {
      name
    }
  }
`;

function Navbar() {
  const [username, setUsername] = useState('');
  const { loading, error, data } = useQuery(GET_USER);

  useEffect(() => {
    if (!loading && data && data.me) {
      setUsername(data.me.name);
    }
  }, [loading, data]);

  return (
    <nav className="navbar">
      <Link to="/"> <h1 className="navbar-brand" style={{color:"white", fontWeight:"bold"}}>Book Store</h1></Link>
      <ul className="navbar-links">
        <Link to="/cart"> <li className="navbar-link"><h2 style={{color:"white"}}>Cart</h2></li></Link>
      </ul>
      <div className="navbar-buttons">
        {username ? (
          <p className="navbar-username">Welcome, {username}</p>
        ) : (
          <>
            <Link to="/signin"> <button className="navbar-button">Sign In</button></Link>
            <Link to="/signup"> <button className="navbar-button">Sign Up</button></Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
