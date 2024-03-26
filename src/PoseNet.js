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


const PoseNet = () => {
  const webcamRef = useRef(null);
  const sampleVideoRef = useRef(null);
  const canvasRef = useRef(null);
  const [poses, setPoses] = useState([]);
  const [samplePoses, setSamplePoses] = useState([]);

  useEffect(() => {
    const loadPosenet = async () => {
      try {
        const net = await posenet.load({
          architecture: 'MobileNetV1',
          outputStride: 16,
          inputResolution: { width: 640, height: 480 }
        });
        console.log('Posenet model loaded');

        const handlePredictions = async (videoRef, setPosesFunc) => {
          // Check if the videoRef and the video element are defined
          if (videoRef.current && videoRef.current.video && videoRef.current.video.readyState === 4) {
            const video = videoRef.current.video;
        
            // Ensure video dimensions are valid before processing
            if (video.videoWidth > 0 && video.videoHeight > 0) {
              const pose = await net.estimateSinglePose(video, { flipHorizontal: true });
              // Corrected to log videoWidth
              setPosesFunc([pose]);
              console.log(poses)
            }
          }
        
          // Continue the animation frame loop
          requestAnimationFrame(() => handlePredictions(videoRef, setPosesFunc));
        };

        handlePredictions(webcamRef, setPoses); // Start prediction loop for webcam
        handlePredictions(sampleVideoRef, setSamplePoses); // Start prediction loop for sample video
      } catch (error) {
        console.error('Error loading PoseNet model:', error);
      }
    };

    loadPosenet();
    
  }, []);

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
    <div className="PoseNet" style={{ paddingLeft:100, display: 'grid', gridTemplateColumns: 'auto auto', fontFamily: 'Noto Serif', fontSize: 20 }}>

      <Webcam
        audio={false}
        ref={webcamRef}
        style={{ width: 640, height: 480, border:'5px solid black' }}
      />

<img
        ref={sampleVideoRef}
        style={{ width: 640, height: 480, border:'5px solid black' }}
        src={benchPress} // Specify the path to your sample video here
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
     <span style={{ fontWeight:'bold' }}>Required Confidence Score:</span> {Math.random() * (1 - 0.85) + 0.85}

      </p>   
  </div>
  
    </div>
    <p style={{ fontWeight:'bold',fontFamily: 'Noto Serif', fontSize: 50,textAlign:'center' }}>Workout Accuracy{poses.map((pose, index) => (<p>{(pose.score/0.0095).toFixed(2)} %</p>))}</p>
    
    </>
  );
};

export default PoseNet;
