import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import './CameraPage.css';
import Footer from '../../components/Footer/Footer';

const CameraPage = () => {
  const webcamRef = useRef(null);
  const [image, setImage] = useState(null);

  const captureImage = () => {
    if (webcamRef.current) {
      const capturedImage = webcamRef.current.getScreenshot();
      setImage(capturedImage);
    }
  };

  const handleRetake = () => {
    setImage(null);
  };

  return (
    <div className="camera-page">
      <header className="camera-header">
        <h1>📸 Ingredient Scanner</h1>
        <p>Reduce waste by scanning your ingredients and get smart recipe suggestions!</p>
      </header>
      <div className="camera-container">
        {image ? (
          <div className="captured-container">
            <img src={image} alt="Captured" className="captured-image" />
            <button onClick={handleRetake} className="action-button retake-button">
              Retake
            </button>
          </div>
        ) : (
          <>
            <Webcam
              ref={webcamRef}
              audio={false}
              screenshotFormat="image/jpeg"
              className="webcam"
            />
            <button onClick={captureImage} className="action-button capture-button">
              Capture
            </button>
          </>
        )}
      </div>
      <Footer style="margin: 0px 0px 0px 0px"/>
    </div>
  );
};

export default CameraPage;
