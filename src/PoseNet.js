import React, { useState, useEffect, useRef } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as posenet from '@tensorflow-models/posenet';
import Webcam from 'react-webcam';

const PoseNet = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null); // Create a reference for the canvas element
  const [poses, setPoses] = useState([]);

  useEffect(() => {
    const loadPosenet = async () => {
      const net = await posenet.load({ architecture: 'MobileNetV1', outputStride: 16 });
      console.log('Posenet model loaded');

      const handlePredictions = async () => {
        if (typeof webcamRef.current !== 'undefined' && webcamRef.current !== null) {
          const video = webcamRef.current.video;

          // Ensure video dimensions are valid before processing
          if (video.videoWidth > 0 && video.videoHeight > 0) {
            const pose = await net.estimateSinglePose(video, { flipHorizontal: true });
            setPoses([pose]);
          }

          requestAnimationFrame(handlePredictions); // Schedule next frame prediction
        }
      };

      handlePredictions();
    };

    loadPosenet();
  }, []);

  const renderPoses = () => {
    poses.forEach(({ score, keypoints }) => {
      if (score > 0.5) { // Display poses with a confidence score above 0.5
        const context = canvasRef.current.getContext('2d');
        context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height); // Clear canvas before drawing
        context.fillStyle = 'red';
        context.lineWidth = 2;

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
  };

  return (
    <div className="PoseNet">
      <Webcam
        audio={false} // Disable audio for privacy or compatibility reasons
        ref={webcamRef}
        style={{ width: 640, height: 480 }} // Adjust dimensions as needed
      />
      <canvas ref={canvasRef} width={640} height={480} style={{ display: 'block' }} /> {/* Canvas for drawing */}
      {renderPoses()} {/* Call the renderPoses function after the canvas is created */}
    </div>
  );
};

export default PoseNet;
