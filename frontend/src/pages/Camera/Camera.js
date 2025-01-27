import React, { useRef, useState } from "react";
import axios from "axios";
import './CameraPage.css';

const IngredientDetectorApp = () => {
  const videoRef = useRef(null);
  const [facingMode, setFacingMode] = useState("environment"); // Default to back camera
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(false);

  const startCamera = async () => {
    const constraints = {
      video: { facingMode },
    };
    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
    }
  };

  const captureImage = () => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL("image/jpeg"); // Capture image as Base64
    processImage(imageData);
  };

  const processImage = async (base64Image) => {
    setLoading(true);
    const base64Data = base64Image.split(",")[1]; // Remove the prefix
    try {
      const response = await axios({
        method: "POST",
        url: "https://detect.roboflow.com/ingredient-detection-5uzov/5",
        params: {
          api_key: process.env.REACT_APP_MODEL_KEY,
        },
        data: base64Data,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      const detectedIngredients = response.data.predictions.map(
        (prediction) => prediction.class
      );
      setIngredients(detectedIngredients);
      console.log("Detected Ingredients:", detectedIngredients);
    } catch (error) {
      console.error("Error processing image:", error.message);
    }
    setLoading(false);
  };

  const handleFacingModeChange = (event) => {
    setFacingMode(event.target.value);
  };

  return (
    <div>
      <h1>Zero-Waste Recipe Finder</h1>
      <div className="camera-container">
        <video ref={videoRef} className="camera-feed"></video>
        <div className="controls">
          <select onChange={handleFacingModeChange} value={facingMode}>
            <option value="environment">Back Camera</option>
            <option value="user">Front Camera</option>
          </select>
          <button onClick={startCamera}>Start Camera</button>
          <button onClick={captureImage}>Capture Image</button>
        </div>
      </div>
      {loading && <p>Processing Image...</p>}
      <div className="results">
        <h2>Detected Ingredients:</h2>
        <ul>
          {ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default IngredientDetectorApp;
