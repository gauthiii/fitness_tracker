import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoIosEye, IoIosEyeOff } from 'react-icons/io';


import './Login.css';
import CustomDialog from './CustomDialog.js';
import './LoadingSpinner.css';

import firebase from './firebase';
import { getAuth,  onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

function Login() {
  const [displayName, setDisplayname] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword1, setShowPassword1] = useState(false);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false); // Toggle state
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  

  const [userProfile, setUser] = useState(null);

  const [errorMessage, setError] = useState('');

  const [loading, setLoading] = useState(true); 

  const navigate = useNavigate();


  const checkUserAuthState = () => {
    const auth = getAuth(firebase);

    // Listen for changes in user authentication state
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is logged in
        setUser(user);
        // Redirect to the home page or any other authenticated route
        console.log("User: ",userProfile);

        
        navigate('/home');
      } else {
        // User is not logged in
        setUser(null);
      }
     setLoading(false); // Set loading to false when the check is complete
    });
  };

  useEffect(() => {
    // Check user authentication state when the component mounts
    checkUserAuthState();
  }, []); // Empty dependency array triggers the effect once when the component mounts


  const handleToggle = () => {
    // Toggle the isSignUp state
    setIsSignUp(!isSignUp);
  };

  const handleLogin = async () => {
    // Log the username and password to the console
    setLoading(true);

    console.log('Username:', username);
    console.log('Password:', password);

   

      try {
        // Sign in with email and password
        const auth = getAuth(firebase);

        if (isSignUp) {
          // Handle sign-up logic

          if(displayName==='' || username==='' || password ==='' || confirmPassword==='')
          {
             setError( 'Field can\'t be Blank!');
        //  setError(`${displayName}`)
            setIsDialogOpen(true);
          }
          else if (password !== confirmPassword){
            setError( 'Your passwords need to match');
            setIsDialogOpen(true);
          }
         else
         { 
          await createUserWithEmailAndPassword(auth, username, password);
         await getOrCreateDocument(displayName,username);
          navigate('/home'); 
        }

        

        } else {
          // Handle login logic

      // Sign in with email and password
      await signInWithEmailAndPassword(auth, username, password);
      await getOrCreateDocument(displayName,username);

      navigate('/home'); 
        }
  
        // If successful, navigate to the dashboard or another route
       // Replace with your desired route
      } catch (error) {
        // Handle authentication errors
        console.error('Authentication Error:', error.message);


        // Check if the error has a specific Firebase error code
  if (error.code) {
    switch (error.code) {
      case 'auth/user-not-found':
        setError( 'User not found. Please check your email.');
        break;
      case 'auth/invalid-email':
        setError( 'Invalid Email. Please check your email.');
        break;
      case 'auth/user-disabled':
        setError( 'This user has been disabled by the admin.');
         break;
      case 'auth/email-already-in-use':
        setError( 'This email is already in use.');
        break;
      case 'auth/weak-password':
        setError( 'This password is very weak. Please try again.');
        break;
      case 'auth/wrong-password':
        setError( 'Invalid password. Please try again.');
        break;
      // Add more cases for other Firebase error codes as needed
      default:
        setError( 'An error occurred during login.');
        break;
    }
  }

        
      }

      setLoading(false);
    

    
    setIsDialogOpen(true);
  };


  const getOrCreateDocument = async (displayName,email) => {
    const db = getFirestore(firebase);
  
    // Reference to the document you want to retrieve or create
    const userDocRef = doc(db, 'ft_users', email);
  
    try {
      // Attempt to get the document
      const docSnapshot = await getDoc(userDocRef);
  
      if (docSnapshot.exists()) {
        // The document already exists; you can access its data
        const userData = docSnapshot.data();
        console.log('Document data:', userData);
      } else { 
        // The document does not exist; create it
        await setDoc(userDocRef, {
          // Initial data for the document
          name: displayName,
          email: email,
          age:'',
          height:'',
          weight:''
          // Add more data as needed
        });
        console.log('Document created.');
      }
    } catch (error) {
      console.error('Error getting or creating document: ', error);
    }
  };

  const handleCloseDialog = () => {
    // Close the custom dialog
    setIsDialogOpen(false);
  };

  

  return (
    <div className='lg'>
       {loading ? ( // Display the loading spinner while loading is true
        <div className="loading-spinner-container">
          <div className="loading-spinner"></div>
        </div>
      ) :(
      <div className="login">
        <h2>{isSignUp ? 'Sign Up' : 'Login'} Screen</h2><br />
        <form >

           {/* DisplayName input */}
         { isSignUp? ( <div className="form-group">
            
            <input
              type="text"
              id="displayName"
              name="displayName"
              placeholder='Enter your full name'
              value={displayName}
              onChange={(e) => setDisplayname(e.target.value)}
              className='l_in'
            />
          </div>):<></>}

          {/* Username input */}
          <div className="form-group">
            
            <input
              type="text"
              id="username"
              name="username"
              placeholder='Enter your email'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className='l_in'
            />
          </div>

            

          {/* Password input */}
          <div className="form-group">
          <div className="password-input">
            <input
             type={showPassword ? 'text' : 'password'}
             id="password"
             name="password"
             value={password}
             onChange={(e) => setPassword(e.target.value)}
             placeholder="Enter your password"
             className='l_in'
            />
            <span
      className="password-toggle"
      onClick={() => setShowPassword(!showPassword)}
    >
      {password===''?<></>: (showPassword ? <IoIosEyeOff size={24} /> : <IoIosEye size={24} />)}
    </span>
    </div>
          </div>
          


           {/* Confirm Password input */}
          {isSignUp? (<div className="form-group">
          <div className="password-input">
            <input
             type={showPassword1 ? 'text' : 'password'}
             id="password"
             name="password"
             value={confirmPassword}
             onChange={(e) => setConfirmPassword(e.target.value)}
             placeholder="Confirm your password"
             className='l_in'
            />
            <span
      className="password-toggle"
      onClick={() => setShowPassword1(!showPassword1)}
    >
      {confirmPassword ===''?<></>: (showPassword1 ? <IoIosEyeOff size={24} /> : <IoIosEye size={24} />)}
    </span>
    </div>
          </div>):<></>}
          
          
          
           <br />

           {/* Conditional text */}
           <p className="toggle-text">
            {isSignUp
              ? "Already have an account? "
              : "Don't have an account? "}
            <span className="toggle-link" onClick={handleToggle}>
              {isSignUp ? 'Log in' : 'Sign up'}
            </span>
          </p>

          {/* Login button */}
          <button type="button" onClick={handleLogin}>
          {isSignUp ? 'Sign Up' : 'Login'}
          </button>

          <button type="button" onClick={handleLogin}>
            Sign in with Google
          </button>
        </form>
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

export default Login;
