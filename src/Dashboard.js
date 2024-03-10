// Dashboard.js

import React, { useState, useEffect } from 'react';

import firebase from './firebase';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import Nav from './Nav.js';

import './Dashboard.css';
import './LoadingSpinner.css';

import CanvasJSReact from '@canvasjs/react-charts'; 

import animationGif from './wk1.gif';
import animationGif2 from './wk2.gif';
import animationGif3 from './wk3.gif';
import animationGif4 from './wk4.gif';
import animationGif5 from './wk5.gif';

import CustomDialog from './CustomDialog.js';

function Dashboard() {


  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [errorMessage, setError] = useState('');

  const [userProfile, setUser] = useState(null);

  const [loading, setLoading] = useState(true);  

  const [view, setView] = useState(false);  

  const [bmi, calcBmi] = useState('');

  const [options, setOptions] = useState(null);



  
  const CanvasJSChart = CanvasJSReact.CanvasJSChart;
  

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
      else
      {  let wt= parseFloat(userData.weight.split(" ")[0]);
        let ht= 0;

        if(userData.weight.split(" ")[1]==="lbs")
        {
          // convert to kg
          wt=wt/2.205;
        }

        if(userData.height.split(" ")[1]==="cm")
        {
         ht= parseFloat(userData.height.split(" ")[0]);
        }
        else {

          //convert to cm

          let ft = parseFloat(userData.height.split(" ")[0].split("'")[0]);
          let inch = parseFloat(userData.height.split(" ")[0].split("'")[1]);

          ht = ((ft*12)+inch)*2.54;

        }
        
        let bmi_val = (wt/ht/ht)*10000;


        calcBmi(`${bmi_val.toFixed(2)}`);

        setOptions({
          animationEnabled: true,
          
          title: {
            text: "Projected Weight Loss Over 6 Months",
            fontColor: "black",
            horizontalAlign: "center", // Center-align the title
          margin: 20, // Add padding under the title
          },
          axisY: {
            title: "Weight (kg)",
            titleFontColor: "black",
            lineColor: "black",
            tickColor: "black", // Set the X-axis tick color to black
          tickLength: 10, // Set the length of ticks on the X-axis
          gridColor: "black", // Set the grid lines color to black
          },
          axisX: {
            title: "Months",
            titleFontColor: "black",
            lineColor: "black",
            tickColor: "black", // Set the X-axis tick color to black
          tickLength: 10, // Set the length of ticks on the X-axis
          gridColor: "black", // Set the grid lines color to black
            
          },
          legend: {
            fontColor: "black", // Change the legend title font color to black
          },
          
          backgroundColor: "brown", // Set the background color here
          width: 600, // Set the width of the chart in pixels
          height: 400, // Set the height of the chart in pixels
          data: [
            {
              type: "spline",
              color: "black",
              dataPoints: [
                { label: "Jan", y: wt },
                { label: "Feb", y: wt-10 },
                {label: "Mar", y: wt-26 },
                { label: "Apr", y: wt-43 },
                { label: "May", y: wt-51 },
                {label: "June", y: wt-66 }, 
              ],
            },
          ],
          plotOptions: {
            line: {
              borderColor: "black", // Set the border color to black
            },
          },
        });
      
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

 
  const checkView = ()=>{
    if(bmi==='' || bmi === 'NaN')
    {
      setError("Please update your profile details");
      setIsDialogOpen(true);
  }
  else
    setView(!view);
    }

  const handleCloseDialog = () => {
    // Close the custom dialog
    setIsDialogOpen(false);
  };

  const getWeightStatus = (bmi) => {
    if (bmi < 18.5) {
      return "Underweight";
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      return "Healthy Weight";
    } else if (bmi >= 25.0 && bmi <= 29.9) {
      return "Overweight";
    } else {
      return "Obesity";
    }
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
      <Nav handleLogout={handleLogout} page="home" />
        
  {/* 
        <div className="workout-text">
  <p onClick={checkView}>{ view ?'Navigate to original Home Screen':'Click here to view Body Stats'}</p>
</div>
*/}

    {view ? <>
      
      <div className="stat1">These are your body stats:</div>
    <div className="stat-text">
      <div className="stat-item">
        <p>Age: {userProfile.age} years</p>
      </div>
      <div className="stat-item">
        <p>Weight: {userProfile.weight}</p>
      </div>
      <div className="stat-item">
        <p>Height: {userProfile.height}</p>
      </div>
    </div>
    <div className="stat1">Your Body Index Mass (BMI) is: {bmi}</div>
    <div className="stat1">Your Weight Status: {getWeightStatus(parseFloat(bmi))}</div><br></br>

    <table className="bmi-table">
    <thead>
      <tr>
        <th>BMI</th>
        <th>Weight Status</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Below 18.5</td>
        <td>Underweight</td>
      </tr>
      <tr>
        <td>18.5 – 24.9</td>
        <td>Healthy Weight</td>
      </tr>
      <tr>
        <td>25.0 – 29.9</td>
        <td>Overweight</td>
      </tr>
      <tr>
        <td>30.0 and Above</td>
        <td>Obesity</td>
      </tr>
    </tbody>
  </table>

  
    <div className="stat1">Now choose your goal</div>

    <div className="chart-container">
    <CanvasJSChart options={options} />
    </div>
    
    </>:  
      <>
      {/* Main Content */}
      <div className="main-content">
        {/* Add your widgets and content here */}
       {/* <img src={loginImage} alt="Login" className="login-image" />*/}
        <img src={animationGif} alt="Animation" className="login-image"   />

        <img src={animationGif2} alt="Animation" className="login-image"   />

        <img src={animationGif3} alt="Animation" className="login-image"   />

        <img src={animationGif4} alt="Animation" className="login-image"   />

        <img src={animationGif5} alt="Animation" className="login-image"  />
        {/* Add your widgets and content below */}
      </div>

      <div className="stat1">These are your body stats:</div>
    <div className="stat-text">
      <div className="stat-item">
        <p>Age: {userProfile.age} years</p>
      </div>
      <div className="stat-item">
        <p>Weight: {userProfile.weight}</p>
      </div>
      <div className="stat-item">
        <p>Height: {userProfile.height}</p>
      </div>
    </div>
    <div className="stat1">Your Body Index Mass (BMI) is: {bmi}</div>
    <div className="stat1">Your Weight Status: {getWeightStatus(parseFloat(bmi))}</div><br></br>

    <table className="bmi-table">
    <thead>
      <tr>
        <th>BMI</th>
        <th>Weight Status</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Below 18.5</td>
        <td>Underweight</td>
      </tr>
      <tr>
        <td>18.5 – 24.9</td>
        <td>Healthy Weight</td>
      </tr>
      <tr>
        <td>25.0 – 29.9</td>
        <td>Overweight</td>
      </tr>
      <tr>
        <td>30.0 and Above</td>
        <td>Obesity</td>
      </tr>
    </tbody>
  </table>

  
    <div className="stat1">Now choose your goal</div>

    <div className="chart-container">
    <CanvasJSChart options={options} />
    </div>
    
      </>}

      

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
