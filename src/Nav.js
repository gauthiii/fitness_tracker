import React from 'react';
import { Link } from 'react-router-dom';

import './Dashboard.css';

function Nav({handleLogout }){

    return(
        <div className="navbar">
        <ul>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/progress">Progress</Link></li>
        </ul>
        <div className="dashboard-search-container">
          <input
            type="text"
            className="dashboard-search-bar"
            placeholder="What do you want to Search?"
          />
        </div>
        <ul>
          
          <li onClick={handleLogout} ><Link to="/">Logout</Link></li>
        </ul>
      </div>
    );
};

export default Nav;
