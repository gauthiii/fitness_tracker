import React from 'react';
import { Link } from 'react-router-dom';

import './Dashboard.css';

function Nav({handleLogout,page }){

 

    return(
        <div className="navbar">
        <ul>
          <li><Link to="/home" className= {page!=="home"?"naLI":"naLI1"}>Home</Link></li>
          <li><Link to="/profile" className={page!=="profile"?"naLI":"naLI1"}>Profile</Link></li>
          <li><Link to="/goal" className={page!=="goal"?"naLI":"naLI1"}>Goal</Link></li>
          <li><Link to="/schedule" className={page!=="schedule"?"naLI":"naLI1"}>Schedule</Link></li>
          <li><Link to="/prediction" className={page!=="prediction"?"naLI":"naLI1"}>Prediction</Link></li>
        </ul>
        <div className="dashboard-search-container">
          {/* <input
            type="text"
            className="dashboard-search-bar"
            placeholder="What do you want to Search?"
          /> */}
          <div className="titleText">
          SquatSync: An AI based fitness tracking website
          </div>
        </div>
        <ul>
          
          <li onClick={handleLogout} ><Link to="/" className="naLI">Logout</Link></li>
        </ul>
      </div>
    );
};

export default Nav;
