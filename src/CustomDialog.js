import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Set the app root element

function CustomDialog({ isOpen, onClose, message }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        content: {
          backgroundColor: 'white',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center', // Center horizontally
          justifyContent: 'center', // Center vertically
          color: 'black',
          width: '300px',
          height: '30vh',
          margin: 'auto',
          fontSize: '0.7rem',
          textAlign: 'center', // Center text
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
        },
      }}
    >
      <h2>{message}</h2>
      <button onClick={onClose}>Close</button>
    </Modal>
  );
}

export default CustomDialog;
