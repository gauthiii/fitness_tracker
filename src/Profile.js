import React, { useState, useEffect } from 'react';
import './Profile.css';

import Nav from './Nav.js';


import firebase from './firebase'; 
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirestore, doc, getDoc,updateDoc, setDoc } from 'firebase/firestore';


import './LoadingSpinner.css';
import CustomDialog from './CustomDialog.js';

// Import the home icon from Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons'; // Adjust this import based on your setup

function Profile() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');


  const [heightUnit, setHeightUnit] = useState('ft');  
  const [weightUnit, setWeightUnit] = useState('lbs');



  const [userProfile, setUser] = useState({
    name: '',
    email:'',
    age:'',
    height:'',
    weight:''

  });

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
       
        console.log("User Email: ",user.email);

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
        
        console.log('Home Page Document data:', userData);
        console.log('Home Page Document email:', userData['email']);

        await   setUser(userData);

       

        setName(userData.name);
        setEmail(userData.email);
        setAge(userData.age);
        setHeight(userData.height.split(" ")[0]);
        setWeight(userData.weight.split(" ")[0]);
        setHeightUnit(userData.height.split(" ")[1]);
        setWeightUnit(userData.weight.split(" ")[1]);

        


      } else {
        // The document does not exist; create it
     
        console.log('Document not found');
      }
    } catch (error) {
      console.error('Error getting or creating document: ', error);
    }
  };

  
  const updateDetails =  async () => {

    setLoading(true);

    const db = getFirestore(firebase);
    const userDocRef = doc(db, 'ft_users', userProfile.email);

    if(name==='' || age==='' || height==='' || weight==='')
    {
      setError("Details can't be Blank!");
      setIsDialogOpen(true);
    }
   else{
    try {
      await updateDoc(userDocRef, {
      name:  name,
        email: email,
        age: age,
        height: height + " " + heightUnit,
        weight: weight + " " + weightUnit,
      });
      console.log('User details updated in Firestore');
      // You can also show a success message or handle redirection as needed
      getOrCreateDocument(email);
      setError("Your details are updated!");
      setIsDialogOpen(true);
      
    } catch (error) {
      console.error('Error updating user details:', error);
      // Handle the error, possibly by displaying an error message to the user
      setError("Your details couldn't get updated. Please try again!");
      setIsDialogOpen(true);
    
    }
  }

    setLoading(false); 
    
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    await updateDetails(); // Call your updateDetails function and await it
  };

  useEffect(() => {
    // Check user authentication state when the component mounts
    checkUserAuthState();
  }, []); // Empty dependency array triggers the effect once when the component mounts


  const handleCloseDialog = () => {
    // Close the custom dialog
    setIsDialogOpen(false);
  };

  const handleGoBack = () => {
    window.history.back(); // This will go back to the previous page in the browser history
  };


  return (
    <div className="pb">
      <Nav handleLogout={handleLogout} />
        {loading ? ( 
         <>
         {/* Display the loading spinner while loading is true */ }
         <br></br><br></br> <br></br><br></br>
        <div className="loading-spinner-container">
          <div className="loading-spinner"></div>
        </div>
        </>
      ) :
    (
      <>
      <div className="cen">
    <div className="profile">
      <h2>
   {/*   <FontAwesomeIcon icon={faHome} className="home-icon" /> */ }
        PROFILE DETAILS</h2>
        <h3>Hello {name}<br />({email})</h3>
      <form onSubmit={handleSubmit}>
      {/*  <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='p_in'
          />
        </div>
        <div className="form-group">
          <label>Email: {email}</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='disabled-input' // Add the class conditionally
            disabled
    />
        </div>*/}
        <div className="form-group">
          <label>Age:</label>
          <input
            type="text"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className='p_in'
          />
        </div>
        <div className="form-group">
          <label>Height:</label>
          <input
            type="text"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className='p_in'
          />
          <select
              value={heightUnit}
              onChange={(e) => setHeightUnit(e.target.value)}
            >
              <option value="ft">Feet-Inches</option>
              <option value="cm">Centimeters</option>
            </select>
        </div>
        <div className="form-group">
          <label>Weight:</label>
          <input
            type="text"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className='p_in'
          />
          <select
              value={weightUnit}
              onChange={(e) => setWeightUnit(e.target.value)}
            >
              <option value="lbs">Pounds</option>
              <option value="kgs">Kilograms</option>
            </select>
        </div>
        <div className="form-group buttons-container">
        <button type="submit" className='proB'>Save Changes</button>
        </div>
        </form>
    </div>
    </div>
    </>
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

export default Profile;
