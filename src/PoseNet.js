import React, { useState, useEffect, useRef } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as posenet from '@tensorflow-models/posenet';
import Webcam from 'react-webcam';


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
import running from './running.mp4'


const PoseNet = ({workout}) => {
  const webcamRef = useRef(null);
  const sampleVideoRef = useRef(null);
  const canvasRef = useRef(null);
  const [poses, setPoses] = useState([]);
  const [samplePoses, setSamplePoses] = useState([]);
  const [isWebcamActive, setIsWebcamActive] = useState(true); // New state variable for managing webcam status

  useEffect(() => {
    if (!isWebcamActive) return; // Do not load PoseNet or start predictions if webcam is not active

    const loadPosenet = async () => {
      try {
        const net = await posenet.load({
          architecture: 'MobileNetV1',
          outputStride: 16,
          inputResolution: { width: 640, height: 480 }
        });
        console.log('Posenet model loaded');

        const handlePredictions = async (videoRef, setPosesFunc) => {
          if (!isWebcamActive) return; // Exit if the webcam has been deactivated
          // Check if the videoRef and the video element are defined
          if (videoRef.current && videoRef.current.video && videoRef.current.video.readyState === 4) {
            const video = videoRef.current.video;
        
            if (video.videoWidth > 0 && video.videoHeight > 0) {
              const pose = await net.estimateSinglePose(video, { flipHorizontal: true });
              setPosesFunc([pose]);
            }
          }
        
          requestAnimationFrame(() => handlePredictions(videoRef, setPosesFunc));
        };

        handlePredictions(webcamRef, setPoses);
        handlePredictions(sampleVideoRef, setSamplePoses);
      } catch (error) {
        console.error('Error loading PoseNet model:', error);
      }
    };

    loadPosenet();
  }, [isWebcamActive]); // Add isWebcamActive as a dependency


    // Function to toggle the webcam
    const toggleWebcam = () => {
      setIsWebcamActive(!isWebcamActive);
    };
  

  const renderPoses = () => {
    if (canvasRef.current && poses.length > 0) {
      const context = canvasRef.current.getContext('2d');
      context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height); // Clear canvas before drawing
      context.fillStyle = 'red';
      context.lineWidth = 2;

      poses.forEach(({ score, keypoints }) => {
        if (score > 0.2) { // Display poses with a confidence score above 0.5
          keypoints.forEach(keypoint => {
            context.beginPath();
            context.arc(keypoint.position.x, keypoint.position.y, 3, 0, 2 * Math.PI);
            context.fill();
          });

          context.strokeStyle = 'blue';
          const connections = [
            [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [6, 7], [7, 8], [8, 9], [10, 11], [11, 12], [12, 13], [14, 15], [15, 16]
          ]; // Keypoint connection pairs for drawing human skeleton
          connections.forEach(([keypointA, keypointB]) => {
            context.beginPath();
            context.moveTo(keypoints[keypointA].position.x, keypoints[keypointA].position.y);
            context.lineTo(keypoints[keypointB].position.x, keypoints[keypointB].position.y);
            context.stroke();
          });
        }
      });
    }
  };

  return (
    <>
      {1==2 ? ( 
         <>
         {/* Display the loading spinner while loading is true */ }
         <br></br><br></br> <br></br><br></br>
        <div className="loading-spinner-container">
          <div className="loading-spinner"></div>
        </div>
        </>
      ) :(
        <>
        {/* <div style={{textAlign:'center'}}>
         <button onClick={toggleWebcam} style={{textAlign:'center',backgroundColor:'black', width:'20vw', borderRadius:'10px'}}>{isWebcamActive ? 'Stop Webcam' : 'Start Webcam'}</button>
         </div> */}
         {isWebcamActive && (<>
    <div className="PoseNet" style={{ paddingLeft:100, display: 'grid', gridTemplateColumns: 'auto auto', fontFamily: 'Noto Serif', fontSize: 20, marginTop:"0px" }}>

      <Webcam
        audio={false}
        ref={webcamRef}
        style={{ width: 500, height: 375, border:'5px solid black' }}
      />

<img
        ref={sampleVideoRef}
        style={{ width: 500, height: 375, border:'5px solid black' }}
        src={workout.image} // Specify the path to your sample video here
      />

    <div>
      {poses.map((pose, index) => (
      <p>
     <span style={{ fontWeight:'bold' }}>Overall Confidence Score:</span> {pose.score}
     {/* <span style={{ fontWeight:'bold' }}>{pose.keypoints[0].part}:</span> {pose.keypoints[0].score} <br></br>
     <span style={{ fontWeight:'bold' }}>{pose.keypoints[1].part}:</span> {pose.keypoints[1].score} <br></br>
     <span style={{ fontWeight:'bold' }}>{pose.keypoints[2].part}:</span> {pose.keypoints[2].score} <br></br>
     <span style={{ fontWeight:'bold' }}>{pose.keypoints[3].part}:</span> {pose.keypoints[3].score} <br></br>
     <span style={{ fontWeight:'bold' }}>{pose.keypoints[4].part}:</span> {pose.keypoints[4].score} <br></br>
     <span style={{ fontWeight:'bold' }}>{pose.keypoints[5].part}:</span> {pose.keypoints[5].score} <br></br>
     <span style={{ fontWeight:'bold' }}>{pose.keypoints[6].part}:</span> {pose.keypoints[6].score} <br></br>
     <span style={{ fontWeight:'bold' }}>{pose.keypoints[7].part}:</span> {pose.keypoints[7].score} <br></br>
     <span style={{ fontWeight:'bold' }}>{pose.keypoints[8].part}:</span> {pose.keypoints[8].score} <br></br>
     <span style={{ fontWeight:'bold' }}>{pose.keypoints[9].part}:</span> {pose.keypoints[9].score} <br></br>
     <span style={{ fontWeight:'bold' }}>{pose.keypoints[10].part}:</span> {pose.keypoints[10].score} <br></br>
     <span style={{ fontWeight:'bold' }}>{pose.keypoints[11].part}:</span> {pose.keypoints[11].score} <br></br>
     <span style={{ fontWeight:'bold' }}>{pose.keypoints[12].part}:</span> {pose.keypoints[12].score} <br></br>
     <span style={{ fontWeight:'bold' }}>{pose.keypoints[13].part}:</span> {pose.keypoints[13].score} <br></br>
     <span style={{ fontWeight:'bold' }}>{pose.keypoints[14].part}:</span> {pose.keypoints[14].score} <br></br>
     <span style={{ fontWeight:'bold' }}>{pose.keypoints[15].part}:</span> {pose.keypoints[15].score} <br></br>
     <span style={{ fontWeight:'bold' }}>{pose.keypoints[16].part}:</span> {pose.keypoints[16].score} <br></br> */}

      </p>   
    
  ))}
  </div>



  <div>
      
      <p>
     <span style={{ fontWeight:'bold' }}>Required Confidence Score:</span> {Math.random() * (1 - workout.score) + workout.score}

      </p>   
  </div>
  
    </div>
    {poses.map((pose, index) => (<p style={{ marginTop:"0px",fontWeight:'bold',fontFamily: 'DM Serif Display', fontSize: 40,textAlign:'center' }}>{"Workout Accuracy: "+(pose.score/(((workout.score+0.05))/100)).toFixed(2)} %</p>))}
    </>)}
    </>  
    )}
    </>
  );
};

export default PoseNet;
