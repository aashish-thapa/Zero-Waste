import React, { useRef, useState } from "react";
import axios from "axios";
import './CameraPage.css';
import { Recipebox } from "../../components/Recipebot/Recipebot";

const IngredientDetectorApp = () => {
  const videoRef = useRef(null);
  const [facingMode, setFacingMode] = useState("environment"); // Default to back camera
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState(null); // To display image preview

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

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Set preview for uploaded image
        processImage(reader.result); // Pass the base64 image to the model
      };
      reader.readAsDataURL(file);
    }
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

  const fetchRecipe = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/findByIngredients`, {
        params: {
          ingredients: ingredients.join(","),
          number: 5,
          ranking: 1,
          apiKey: process.env.REACT_APP_RECIPE_KEY,
        },
        headers: {
          "Content-Type": "application/json",
        },

      });
      setRecipes(response.data);
      console.log(response.data);
    } catch (err) {
      setError("Failed to fetch recipes. Please try again later.");
    } finally {
      setLoading(false);
    }
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

          {/* File upload input */}
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </div>
      </div>

      {/* Display uploaded image preview */}
      {imagePreview && <img src={imagePreview} alt="Uploaded Preview" className="image-preview" />}
      
      {loading && <p>Processing Image...</p>}

      <div className="results">
        <h2>Detected Ingredients:</h2>
        <ul>
          {ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
          <Recipebox sharedData={ingredients} />
        </ul>
      </div>
    </div>
  );
};

export default IngredientDetectorApp;
