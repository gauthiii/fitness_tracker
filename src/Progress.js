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
import chestSqueeze from './chestSqueeze.gif';
import reverseFly from './reverseFly.gif';
import pushPress from './pushPress.gif';
import facePull from './facePull.gif';
import seeSawPress from './seeSawPress.gif';
import rearDeltFly from './rearDeltFly.gif';
import barbellFrontRaise from './barbellFrontRaise.gif';
import deadLift from './deadLift.gif';
import pullUp from './pullUp.gif';
import cableRow from './cableRow.gif';
import tBarRow from './tBarRow.gif';
import latPullDown from './latPullDown.gif';
import pendlayRow from './pendlayRow.gif';
import lunges from './lunges.gif';
import calfRaise from './calfRaise.gif';
import legExtenstion from './legExtenstion.gif';
import legCurl from './legCurl.gif';
import squat from './squat.gif';
import legPress from './legPress.gif';


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
  
  <div className="workTitle">Chest Workouts</div>
  <div class="grid-container">
  <div class="grid-item">
  <img src={benchPress} alt="Animation" className="workout-image"   />
  <br />Bench Press
  <br /><span className='rep'>{(selectedGoal=="Lose Weight")?"4 x 30":(selectedGoal=="Gain Weight")?"3 x 20":"4 x 20"} Reps</span>
  </div>
  <div class="grid-item">
  <img src={machineFly} alt="Animation" className="workout-image"   />
  <br />Machine Fly
  <br /><span className='rep'>{(selectedGoal=="Lose Weight")?"4 x 30":(selectedGoal=="Gain Weight")?"3 x 20":"4 x 20"} Reps</span>
  </div>
  <div class="grid-item">
  <img src={chestDip} alt="Animation" className="workout-image"   />
  <br />Chest Dip
  <br /><span className='rep'>{(selectedGoal=="Lose Weight")?"4 x 30":(selectedGoal=="Gain Weight")?"3 x 20":"4 x 20"} Reps</span>
  </div>  
  <div class="grid-item">
  <img src={cableCrossover} alt="Animation" className="workout-image"   />
  <br />Cable Cross Over
  <br /><span className='rep'>{(selectedGoal=="Lose Weight")?"4 x 30":(selectedGoal=="Gain Weight")?"3 x 20":"4 x 20"} Reps</span>
  </div>
  <div class="grid-item">
  <img src={diamondPushUp} alt="Animation" className="workout-image"   />
    <br />Diamond Push Up
    <br /><span className='rep'>{(selectedGoal=="Lose Weight")?"4 x 30":(selectedGoal=="Gain Weight")?"3 x 20":"4 x 20"} Reps</span>
  </div>
  <div class="grid-item">
  <img src={chestSqueeze} alt="Animation" className="workout-image"   />
    <br />Plate Squeeze Press
    <br /><span className='rep'>{(selectedGoal=="Lose Weight")?"4 x 30":(selectedGoal=="Gain Weight")?"3 x 20":"4 x 20"} Reps</span>
    </div>
</div>


<div className="workTitle">Shoulder Workouts</div>
  <div class="grid-container">
  <div class="grid-item">
  <img src={reverseFly} alt="Animation" className="workout-image"   />
  <br />Reverse Fly
  <br /><span className='rep'>{(selectedGoal=="Lose Weight")?"4 x 30":(selectedGoal=="Gain Weight")?"3 x 20":"4 x 20"} Reps</span>
  </div>
  <div class="grid-item">
  <img src={pushPress} alt="Animation" className="workout-image"   />
  <br />Push Press
  <br /><span className='rep'>{(selectedGoal=="Lose Weight")?"4 x 30":(selectedGoal=="Gain Weight")?"3 x 20":"4 x 20"} Reps</span>
  </div>
  <div class="grid-item">
  <img src={facePull} alt="Animation" className="workout-image"   />
  <br />Face Pull
  <br /><span className='rep'>{(selectedGoal=="Lose Weight")?"4 x 30":(selectedGoal=="Gain Weight")?"3 x 20":"4 x 20"} Reps</span>
  </div>  
  <div class="grid-item">
  <img src={seeSawPress} alt="Animation" className="workout-image"   />
  <br />See Saw Press
  <br /><span className='rep'>{(selectedGoal=="Lose Weight")?"4 x 30":(selectedGoal=="Gain Weight")?"3 x 20":"4 x 20"} Reps</span>
  </div>
  <div class="grid-item">
  <img src={rearDeltFly} alt="Animation" className="workout-image"   />
    <br />Rear Delt Fly
    <br /><span className='rep'>{(selectedGoal=="Lose Weight")?"4 x 30":(selectedGoal=="Gain Weight")?"3 x 20":"4 x 20"} Reps</span>
  </div>
  <div class="grid-item">
  <img src={barbellFrontRaise} alt="Animation" className="workout-image"   />
    <br />Barbell Front Raise
    <br /><span className='rep'>{(selectedGoal=="Lose Weight")?"4 x 30":(selectedGoal=="Gain Weight")?"3 x 20":"4 x 20"} Reps</span>
    </div>
</div>

<div className="workTitle">Lat Workouts</div>
  <div class="grid-container">
  <div class="grid-item">
  <img src={deadLift} alt="Animation" className="workout-image"   />
  <br />Deadlift
  <br /><span className='rep'>{(selectedGoal=="Lose Weight")?"4 x 30":(selectedGoal=="Gain Weight")?"3 x 20":"4 x 20"} Reps</span>
  </div>
  <div class="grid-item">
  <img src={pullUp} alt="Animation" className="workout-image"   />
  <br />Pull Up
  <br /><span className='rep'>{(selectedGoal=="Lose Weight")?"4 x 30":(selectedGoal=="Gain Weight")?"3 x 20":"4 x 20"} Reps</span>
  </div>
  <div class="grid-item">
  <img src={cableRow} alt="Animation" className="workout-image"   />
  <br />Cable Row
  <br /><span className='rep'>{(selectedGoal=="Lose Weight")?"4 x 30":(selectedGoal=="Gain Weight")?"3 x 20":"4 x 20"} Reps</span>
  </div>  
  <div class="grid-item">
  <img src={tBarRow} alt="Animation" className="workout-image"   />
  <br />T-Bar Row
  <br /><span className='rep'>{(selectedGoal=="Lose Weight")?"4 x 30":(selectedGoal=="Gain Weight")?"3 x 20":"4 x 20"} Reps</span>
  </div>
  <div class="grid-item">
  <img src={latPullDown} alt="Animation" className="workout-image"   />
    <br />Lat Pull Down
    <br /><span className='rep'>{(selectedGoal=="Lose Weight")?"4 x 30":(selectedGoal=="Gain Weight")?"3 x 20":"4 x 20"} Reps</span>
  </div>
  <div class="grid-item">
  <img src={pendlayRow} alt="Animation" className="workout-image"   />
    <br />Pendlay Row
    <br /><span className='rep'>{(selectedGoal=="Lose Weight")?"4 x 30":(selectedGoal=="Gain Weight")?"3 x 20":"4 x 20"} Reps</span>
    </div>
</div>


<div className="workTitle">Leg Workouts</div>
  <div class="grid-container">
  <div class="grid-item">
  <img src={lunges} alt="Animation" className="workout-image"   />
  <br />Lunges
  <br /><span className='rep'>{(selectedGoal=="Lose Weight")?"4 x 30":(selectedGoal=="Gain Weight")?"3 x 20":"4 x 20"} Reps</span>
  </div>
  <div class="grid-item">
  <img src={calfRaise} alt="Animation" className="workout-image"   />
  <br />Calf Raise
  <br /><span className='rep'>{(selectedGoal=="Lose Weight")?"4 x 30":(selectedGoal=="Gain Weight")?"3 x 20":"4 x 20"} Reps</span>
  </div>
  <div class="grid-item">
  <img src={legExtenstion} alt="Animation" className="workout-image"   />
  <br />Leg Extension
  <br /><span className='rep'>{(selectedGoal=="Lose Weight")?"4 x 30":(selectedGoal=="Gain Weight")?"3 x 20":"4 x 20"} Reps</span>
  </div>  
  <div class="grid-item">
  <img src={legCurl} alt="Animation" className="workout-image"   />
  <br />Leg Curl
  <br /><span className='rep'>{(selectedGoal=="Lose Weight")?"4 x 30":(selectedGoal=="Gain Weight")?"3 x 20":"4 x 20"} Reps</span>
  </div>
  <div class="grid-item">
  <img src={squat} alt="Animation" className="workout-image"   />
    <br />Squats
    <br /><span className='rep'>{(selectedGoal=="Lose Weight")?"4 x 30":(selectedGoal=="Gain Weight")?"3 x 20":"4 x 20"} Reps</span>
  </div>
  <div class="grid-item">
  <img src={legPress} alt="Animation" className="workout-image"   />
    <br />Leg Press
    <br /><span className='rep'>{(selectedGoal=="Lose Weight")?"4 x 30":(selectedGoal=="Gain Weight")?"3 x 20":"4 x 20"} Reps</span>
    </div>
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
