// Progress.js

import React, { useState,useEffect } from 'react';
import './Progress.css'; // Import your custom CSS file

import firebase from './firebase';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';

import Nav from './Nav.js';

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
  const [selectedWorkouts, setSelectedWorkouts] = useState([]);

  const chestWorkouts = [
    { image: benchPress, name: 'Bench Press'},
    { image: machineFly, name: 'Machine Fly'},
    { image: chestDip, name: 'Chest Dip'},
    { image: cableCrossover, name: 'Cable Cross Over'},
    { image: diamondPushUp, name: 'Diamond Push Up'},
    { image: chestSqueeze, name: 'Plate Squeeze Press'}
  ];

  const shoulderWorkouts = [
    { image: reverseFly, name: 'Reverse Fly'},
    { image: pushPress, name: 'Push Press'},
    { image: facePull, name: 'Face Pull'},
    { image: seeSawPress, name: 'See Saw Press'},
    { image: rearDeltFly, name: 'Rear Delt Fly'},
    { image: barbellFrontRaise, name: 'Barbell Front Raise'}
  ];
  
  const latWorkouts = [
    { image: deadLift, name: 'Deadlift'},
    { image: pullUp, name: 'Pull Up'},
    { image: cableRow, name: 'Cable Row'},
    { image: tBarRow, name: 'T-Bar Row'},
    { image: latPullDown, name: 'Lat Pull Down'},
    { image: pendlayRow, name: 'Pendlay Row'}
  ];

  const legWorkouts = [
    { image: lunges, name: 'Lunges'},
    { image: calfRaise, name: 'Calf Raise'},
    { image: legExtenstion, name: 'Leg Extension'},
    { image: legCurl, name: 'Leg Curl'},
    { image: squat, name: 'Squat'},
    { image: legPress, name: 'Leg Press'}
  ]; 
    


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


  const generateWorkoutSchedule = async () => {
    setLoading(true);

    const chest = getRandomItems(chestWorkouts, 3);
    const shoulder = getRandomItems(shoulderWorkouts, 3);
    const lat = getRandomItems(latWorkouts, 3);
    const leg = getRandomItems(legWorkouts, 3);
    

    const selected = [...chest, ...shoulder, ...lat, ...leg];
    setSelectedWorkouts([...chest, ...shoulder, ...lat, ...leg]);

    console.log(selectedWorkouts);
    //new changes

    const db = getFirestore(firebase);
    const userDocRef = doc(db, 'ft_users', userProfile.email);


    try {
      await updateDoc(userDocRef, {
      goal:selectedGoal,  
      schedule: selectedWorkouts
      });
      console.log('User details updated in Firestore');
      // You can also show a success message or handle redirection as needed
      getOrCreateDocument(userProfile.email);
      setError("Your schedule is saved in Firestore!");
      setIsDialogOpen(true);
      
    } catch (error) {
      console.error('Error updating user details:', error);
      // Handle the error, possibly by displaying an error message to the user
      setError("Your schedule couldn't get updated. Please try again!");
      setIsDialogOpen(true);
    
    }
    
    setLoading(false);
  };

  const getRandomItems = (array, numItems) => {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numItems);
  };

  const randomNumber = (min, max) => {
    return Math.random() * (max - min) + min;
}

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
       
      {showProgressBar ?<><div className='buffer'></div> <p className="goalchoose">Fetching results to {selectedGoal}</p></> 
      :
      (  <div className="goal-buttons">
          <p className="goalchoose">{selectedGoal===null && "Your workout schedule ("+ userProfile.goal+")"}</p>
         
        </div>)}
    



{
 userProfile.schedule.length>0 &&  (<div>

   
 
  <div className="workTitle">MONDAY</div>
   <div class="grid-container">
   {userProfile.schedule.slice(0, 3).map((workout, index) => (
    <div className="grid-item" key={index}>
      <img src={workout.image} alt="Animation" className="workout-image" />
      <br />{workout.name}
      <br /><span className='rep'>{(selectedGoal === "Lose Weight") ? "4 x 30" : (selectedGoal === "Gain Weight") ? "3 x 20" : "4 x 20"} Reps</span>
    </div>
  ))}
</div>

<div className="workTitle">TUESDAY</div>
   <div class="grid-container">
   {userProfile.schedule.slice(3, 6).map((workout, index) => (
    <div className="grid-item" key={index}>
      <img src={workout.image} alt="Animation" className="workout-image" />
      <br />{workout.name}
      <br /><span className='rep'>{(selectedGoal === "Lose Weight") ? "4 x 30" : (selectedGoal === "Gain Weight") ? "3 x 20" : "4 x 20"} Reps</span>
    </div>
  ))} 
</div>

<div className="workTitle">WEDNESDAY</div>
   <div class="grid-container">
   {userProfile.schedule.slice(6, 9).map((workout, index) => (
    <div className="grid-item" key={index}>
      <img src={workout.image} alt="Animation" className="workout-image" />
      <br />{workout.name}
      <br /><span className='rep'>{(selectedGoal === "Lose Weight") ? "4 x 30" : (selectedGoal === "Gain Weight") ? "3 x 20" : "4 x 20"} Reps</span>
    </div>
  ))}
</div>

<div className="workTitle">THURSDAY</div>
   <div class="grid-container">
   {userProfile.schedule.slice(9, 12).map((workout, index) => (
    <div className="grid-item" key={index}>
      <img src={workout.image} alt="Animation" className="workout-image" />
      <br />{workout.name}
      <br /><span className='rep'>{(selectedGoal === "Lose Weight") ? "4 x 30" : (selectedGoal === "Gain Weight") ? "3 x 20" : "4 x 20"} Reps</span>
    </div>
  ))}
</div>

<div className="workTitle">FRIDAY</div>
   <div class="grid-container">
   {userProfile.schedule.slice(0, 3).map((workout, index) => (
    <div className="grid-item" key={index}>
      <img src={workout.image} alt="Animation" className="workout-image" />
      <br />{workout.name}
      <br /><span className='rep'>{(selectedGoal === "Lose Weight") ? "4 x 30" : (selectedGoal === "Gain Weight") ? "3 x 20" : "4 x 20"} Reps</span>
    </div>
  ))}
</div>


 </div>

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
