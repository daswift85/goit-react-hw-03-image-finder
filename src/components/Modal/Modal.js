import React from 'react';

const Modal = ({ image, onClose }) => {
  const { largeImageURL, tags } = image;

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (event) => {
    if (event.code === 'Escape') {
      onClose();
    }
  };

  return (
    <div className="Overlay" onClick={handleOverlayClick} onKeyDown={handleKeyDown}>
      <div className="Modal">
        <img src={largeImageURL} alt={tags} />
      </div>
    </div>
  );
};

export default Modal;
