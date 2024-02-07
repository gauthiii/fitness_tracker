// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';
import Profile from './Profile';
import Login from './Login';
import Progress from './Progress';
import Schedule from './Progress';

function App() {
  return (
    
      <div className="App">
    <Router>
      <Routes> 
        
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/progress" element={<Progress />} />
      <Route path="/schedule" element={<Schedule />} />
      
      </Routes>
    </Router>
      </div>
    
  );
}

export default App;
