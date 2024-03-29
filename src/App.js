// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';
import Profile from './Profile';
import Login from './Login';
import Progress from './Progress';
import Schedule from './Schedule';
import Prediction from './Prediction';

function App() {
  return (
    
      <div className="App">
    <Router>
      <Routes> 
        
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/goal" element={<Progress />} />
      <Route path="/schedule" element={<Schedule />} />
      <Route path="/prediction" element={<Prediction />} />

      </Routes>
    </Router>
      </div>
    
  );
}

export default App;
