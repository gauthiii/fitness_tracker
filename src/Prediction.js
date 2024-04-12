// Dashboard.js

import React, { useState, useEffect } from 'react';

import firebase from './firebase';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import Nav from './Nav.js';

import './Dashboard.css';
import './LoadingSpinner.css';

import { useLocation } from 'react-router-dom';





import CustomDialog from './CustomDialog.js';

import PoseNet from './PoseNet';

function Dashboard() {


  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [errorMessage, setError] = useState('');

  const [userProfile, setUser] = useState(null);

  const [loading, setLoading] = useState(true);
  
  const location = useLocation();
  const workout = location.state ? location.state.workout : null;





  
 
  

  const checkUserAuthState = () => {
    const auth = getAuth(firebase);
     

    // Listen for changes in user authentication state
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is logged in
     
        // Redirect to the home page or any other authenticated route
       
       

        await getOrCreateDocument(user.email);

       
      
      } else {
        // User is not logged in
        setUser(null);
        window.location.href = '/';
      }
      setLoading(false); // Set loading to false when the check is complete
    });

  };


  const getOrCreateDocument = async (email) => {
    const db = getFirestore(firebase);

 
    // Reference to the document you want to retrieve or create
    const userDocRef = doc(db, 'ft_users', email);
  
    try {
      // Attempt to get the document
      const docSnapshot = await getDoc(userDocRef);
  
      if (docSnapshot.exists()) {
        // The document already exists; you can access its data
        const userData = docSnapshot.data();
        
      

       setUser(userData);

        
       if(userData.weight==='' || userData.height==='' || userData.height===' undefined' || userData.weight===' undefined' || userData.age==='')
       {
           setError("Please update your profile details");
           setIsDialogOpen(true);
       }
     


      } else {
        // The document does not exist; create it
     
        console.log('Document not found');
      }
    } catch (error) {
      console.error('Error getting or creating document: ', error);
    }
  };

  
  

  useEffect(() => {
    // Check user authentication state when the component mounts
    checkUserAuthState();
  }, []); // Empty dependency array triggers the effect once when the component mounts

   // Function to handle user logout
   const handleLogout = async () => {
    try {
      // Initialize Firebase Authentication
      const auth = getAuth();

      // Sign out the user
      await signOut(auth);

      // Redirect to the login page or any other desired route after logout
      // Example: Redirect to the login page
     window.location.href = '/'; // You can use the React Router's navigation instead if needed
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

 
  

  const handleCloseDialog = () => {
    // Close the custom dialog
    setIsDialogOpen(false);
  };



  return (
    <div className='db'>
       {loading ? ( 
         <>
         {/* Display the loading spinner while loading is true */ }
         <br></br><br></br> <br></br><br></br>
        <div className="loading-spinner-container">
          <div className="loading-spinner"></div>
        </div>
        </>
      ) :(
    <div className="dashboard">
      {/* Navbar */}
    { /*  <div className="navbar">
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
      </div> */ }
      <Nav handleLogout={handleLogout} page="prediction" />
        


  
      <br></br><br></br>
      <div className="stat1">Pose Estimation:</div>
      <br></br> <br></br><br></br>
   

    {userProfile.goal?( workout ?<PoseNet workout={ workout} />:<PoseNet workout={ userProfile.schedule[4]} />):(<><p style={{marginLeft:"50px"}} className="goalchoose">Go to Goal screen and save a schedule.</p></>)}

   
    
   

      

    </div>
      )}
         {/* Custom dialog */}
         <CustomDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        message={errorMessage}
      />
    </div>
  );
}

export default Dashboard;
