import React, { useState, useEffect, useRef } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as posenet from '@tensorflow-models/posenet';
import Webcam from 'react-webcam';

const PoseNet = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [poses, setPoses] = useState([]);

  useEffect(() => {
    const loadPosenet = async () => {
      try {
        const net = await posenet.load({
          architecture: 'MobileNetV1',
          outputStride: 16,
          inputResolution: { width: 640, height: 480 }
        });
        console.log('Posenet model loaded');

        const handlePredictions = async () => {
          if (webcamRef.current && webcamRef.current.video.readyState === 4) {
            const video = webcamRef.current.video;

            // Ensure video dimensions are valid before processing
            if (video.videoWidth > 0 && video.videoHeight > 0) {
              const pose = await net.estimateSinglePose(video, { flipHorizontal: true });
              console.log(video.videoHeight,video.videoHeight);
              setPoses([pose]);
           
            }
          }

          requestAnimationFrame(handlePredictions); // Schedule next frame prediction
        };

        handlePredictions();
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
        if (score > 0) { // Display poses with a confidence score above 0.5
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
    <div className="PoseNet" style={{ paddingLeft:100, display: 'grid', gridTemplateColumns: 'auto auto', fontFamily: 'Noto Serif', fontSize: 20 }}>
    <div>
      {poses.map((pose, index) => (
      <p>
     <span style={{ fontWeight:'bold' }}>Overall Confidence Score:</span> {pose.score} <br></br><br></br>
     <span style={{ fontWeight:'bold' }}>{pose.keypoints[0].part}:</span> {pose.keypoints[0].score} <br></br>
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
     <span style={{ fontWeight:'bold' }}>{pose.keypoints[16].part}:</span> {pose.keypoints[16].score} <br></br>

      </p>   
    
  ))}
  </div>

      <Webcam
        audio={false}
        ref={webcamRef}
        style={{ width: 640, height: 480 }}
      />
      <canvas
        ref={canvasRef}
        width={640}
        height={480}
        style={{ display: 'block' }}
      />
      {renderPoses()}
  
    </div>
  );
};

export default PoseNet;
