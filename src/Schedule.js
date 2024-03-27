// Progress.js

import React, { useState,useEffect } from 'react';
import './Progress.css'; // Import your custom CSS file

import firebase from './firebase';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';

import Nav from './Nav.js';

import './LoadingSpinner.css';
import CustomDialog from './CustomDialog.js';






function Progress() {
  const [userProfile, setUser] = useState(null);

  const [loading, setLoading] = useState(true);  




  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [errorMessage, setError] = useState('');






 
    


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




const handleCloseDialog = () => {
  // Close the custom dialog
  setIsDialogOpen(false);
};

  useEffect(() => {
    // Check user authentication state when the component mounts
    checkUserAuthState();
  }, []); // Empty dependency array triggers the effect once when the component mounts

  return (
    <div className="prb">
      <Nav handleLogout={handleLogout} page="schedule" />
      {loading ? ( 
         <>
         {/* Display the loading spinner while loading is true */ }
         <br></br><br></br> <br></br><br></br>
        <div className="loading-spinner-container">
          <div className="loading-spinner"></div>
        </div>
        </>
      ) :(
        
      <div className="progress-container">
       
      {
      userProfile.schedule && (  <div className="goal-buttons">
          <p className="goalchoose">{"Your workout schedule ("+ userProfile.goal+")"}</p>
         
        </div>)}
    



{
 userProfile.schedule ? (<div>

   
 
  <div className="workTitle">MONDAY</div>
   <div class="grid-container">
   {userProfile.schedule.slice(0, 4).map((workout, index) => (
    <div className="grid-item" key={index}>
      <img src={workout.image} alt="Animation" className="workout-image" />
      <br />{workout.name}
      <br /><span className='rep'>{(userProfile.goal === "Lose Weight") ? "4 x 30" : (userProfile.goal === "Gain Weight") ? "3 x 20" : "4 x 20"} Reps</span>
    </div>
  ))}
</div>

<div className="workTitle">TUESDAY</div>
   <div class="grid-container">
   {userProfile.schedule.slice(4, 8).map((workout, index) => (
    <div className="grid-item" key={index}>
      <img src={workout.image} alt="Animation" className="workout-image" />
      <br />{workout.name}
      <br /><span className='rep'>{(userProfile.goal === "Lose Weight") ? "4 x 30" : (userProfile.goal === "Gain Weight") ? "3 x 20" : "4 x 20"} Reps</span>
    </div>
  ))} 
</div>

<div className="workTitle">WEDNESDAY</div>
   <div class="grid-container">
   {userProfile.schedule.slice(8, 12).map((workout, index) => (
    <div className="grid-item" key={index}>
      <img src={workout.image} alt="Animation" className="workout-image" />
      <br />{workout.name}
      <br /><span className='rep'>{(userProfile.goal === "Lose Weight") ? "4 x 30" : (userProfile.goal === "Gain Weight") ? "3 x 20" : "4 x 20"} Reps</span>
    </div>
  ))}
</div>

<div className="workTitle">THURSDAY</div>
   <div class="grid-container">
   {userProfile.schedule.slice(12, 16).map((workout, index) => (
    <div className="grid-item" key={index}>
      <img src={workout.image} alt="Animation" className="workout-image" />
      <br />{workout.name}
      <br /><span className='rep'>{(userProfile.goal === "Lose Weight") ? "4 x 30" : (userProfile.goal === "Gain Weight") ? "3 x 20" : "4 x 20"} Reps</span>
    </div>
  ))}
</div>

<div className="workTitle">FRIDAY</div>
   <div class="grid-container">
   {userProfile.schedule.slice(16, 20).map((workout, index) => (
    <div className="grid-item" key={index}>
      <img src={workout.image} alt="Animation" className="workout-image" />
      <br />{workout.name}
      <br /><span className='rep'>{(userProfile.goal === "Lose Weight") ? "4 x 30" : (userProfile.goal === "Gain Weight") ? "3 x 20" : "4 x 20"} Reps</span>
    </div>
  ))}
</div>

<div className="workTitle">SATURDAY</div>
   <div class="grid-container">
   {userProfile.schedule.slice(20, 24).map((workout, index) => (
    <div className="grid-item" key={index}>
      <img src={workout.image} alt="Animation" className="workout-image" />
      <br />{workout.name}
      <br /><span className='rep'>{(userProfile.goal === "Lose Weight") ? "4 x 30" : (userProfile.goal === "Gain Weight") ? "3 x 20" : "4 x 20"} Reps</span>
    </div>
  ))}
</div>


 </div>

 ):(
  <>
  <div className="goal-buttons">
          <p className="goalchoose">{userProfile.goal===null && "Choose your schedule from the Progress Tab"}</p>
         
        </div></>
 )}



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

export default Progress;
