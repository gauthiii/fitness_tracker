// Progress.js

import React, { useState,useEffect } from 'react';
import './Progress.css'; // Import your custom CSS file

import firebase from './firebase';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';



import './LoadingSpinner.css';
import CustomDialog from './CustomDialog.js';

import benchPress from './benchPress.gif';
import machineFly from './machineFly.gif';
import chestDip from './chestDip.gif';
import cableCrossover from './cableCrossover.gif';
import diamondPushUp from './diamondPushUp.gif';

function Progress() {
  const [userProfile, setUser] = useState(null);

  const [loading, setLoading] = useState(true);  




  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [errorMessage, setError] = useState('');




  const [selectedGoal, setSelectedGoal] = useState(null);
  const [showProgressBar, setShowProgressBar] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleGoalSelection = (goal) => {
    setSelectedGoal(goal);
  
    setShowProgressBar(true);

    // Set a timer for 5 seconds
    const timer = setInterval(() => {
      // Increment progress every 100 milliseconds
      setProgress((prevProgress) => prevProgress + 1);
    }, 100);

    // After 5 seconds, hide the progress bar
    setTimeout(() => {
      clearInterval(timer);
      setShowProgressBar(false);
      setProgress(0);
      console.log(selectedGoal);
 
    

      
      
    }, 5000);
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



  useEffect(() => {
    // Check user authentication state when the component mounts
    checkUserAuthState();
  }, []); // Empty dependency array triggers the effect once when the component mounts

  return (
    <div className="prb">
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
      {showProgressBar ?<><div className='buffer'></div> <p className="goalchoose">Fetching results to {selectedGoal}</p></> :(  <div className="goal-buttons">
          <p className="goalchoose">{selectedGoal===null && "Choose Your Goal:"}</p>
          <button
            className={selectedGoal!=='Lose Weight' ?`goal-button`:`goal-selected`}
            onClick={() =>selectedGoal==='Lose Weight'? setSelectedGoal(null):handleGoalSelection('Lose Weight')}
          >
            Lose Weight
          </button>
          <button
            className={selectedGoal!=='Gain Weight' ?`goal-button`:`goal-selected`}
            onClick={() =>selectedGoal==='Gain Weight'? setSelectedGoal(null): handleGoalSelection('Gain Weight')}
          >
            Gain Weight
          </button>
          <button
            className={selectedGoal!=='Build Muscles' ?`goal-button`:`goal-selected`}
            onClick={() =>selectedGoal==='Build Muscles'? setSelectedGoal(null): handleGoalSelection('Build Muscles')}
          >
            Build Muscles
          </button>
        </div>)}
        {/* Display progress bar if needed */}
        {showProgressBar && (
          <div className="progress-bar">
            <div className="progress-bar-inner" style={{ width: `${(progress / 50) * 100}%` }}>{Math.round((progress / 50) * 100)}%</div>
          </div>
        )}

{
 selectedGoal!==null && !showProgressBar &&  (
 <>

 <p className="goalchoose">
  Your workout approach to {(selectedGoal=="Lose Weight")?"losing weight":(selectedGoal=="Gain Weight")?"gaining weight":"building muscles"} must be <br/><br />{(selectedGoal=="Lose Weight")?"LESS WEIGHTS, MORE REPS":(selectedGoal=="Gain Weight")?"MORE WEIGHTS, LESS REPS":"MORE WEIGHTS, MORE REPS"}</p>

  <div class="grid-container">
  <div class="grid-item">
  <img src={benchPress} alt="Animation" className="workout-image"   />
  <br />Bench Press
  </div>
  <div class="grid-item">
  <img src={machineFly} alt="Animation" className="workout-image"   />
  <br />Machine Fly
  </div>
  <div class="grid-item">
  <img src={chestDip} alt="Animation" className="workout-image"   />
  <br />Chest Dip
  </div>  
  <div class="grid-item">
  <img src={cableCrossover} alt="Animation" className="workout-image"   />
  <br />cableCrossover
  </div>
  <div class="grid-item">
  <img src={diamondPushUp} alt="Animation" className="workout-image"   />
    <br />diamondPushUp
  </div>
  <div class="grid-item">6</div>  

</div>
    </>
    )
    }

      </div>
      )}
    </div>
  );
}

export default Progress;
