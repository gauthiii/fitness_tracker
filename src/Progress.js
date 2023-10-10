import React, { useState } from 'react';
import './Progress.css'; // Import your custom CSS file

function Progress() {
    const [file, setFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
  
    const handleFileChange = (e) => {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
    };
  
    const handleUpload = () => {
      // Simulate file upload progress (you would replace this with your actual upload logic)
      const simulateUpload = () => {
        let progress = 0;
        const interval = setInterval(() => {
          progress += 10;
          setUploadProgress(progress);
          if (progress === 100) {
            clearInterval(interval);
          }
        }, 1000);
      };
  
      simulateUpload();
    };
  
    return (
        <div className="prb">
      <div className="progress-container">
        <h2>Image Upload Progress</h2>
        <div className="file-input-container">
          <label htmlFor="file-input" className="file-input-label">
            Select File
          </label>
          <input
            type="file"
            id="file-input"
            onChange={handleFileChange}
            className="file-input"
          />
          
        </div>
        {file && (
          <div className="selected-image">
            <p>Selected Image:</p>
            <img
              src={URL.createObjectURL(file)}
              alt="Selected"
              className="selected-image-preview"
            />
          </div>
        )}
        {/*file && (
          <div className="upload-progress">
            <p>Uploading: {file.name}</p>
            <div className="progress-bar">
              <div className="progress" style={{ width: `${uploadProgress}%` }}>
                {uploadProgress}%
              </div>
            </div>
          </div>
        ) */}
      </div>
      </div>
    );
}

export default Progress;
