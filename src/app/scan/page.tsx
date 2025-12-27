"use client";

import { useState, useRef, useCallback } from "react";
import { Camera, Upload, X, Loader2, RefreshCw, Sparkles, ChefHat } from "lucide-react";
import RecipeChat from "@/components/RecipeChat";

export default function ScanPage() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showCamera, setShowCamera] = useState(false);
  const [showRecipeChat, setShowRecipeChat] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
      }
      setShowCamera(true);
    } catch (err) {
      setError("Could not access camera. Please check permissions.");
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setShowCamera(false);
  };

  const captureImage = () => {
    if (!videoRef.current) return;

    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx?.drawImage(videoRef.current, 0, 0);
    const imageData = canvas.toDataURL("image/jpeg");
    setImagePreview(imageData);
    stopCamera();
    processImage(imageData);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        processImage(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const processImage = async (base64Image: string) => {
    setLoading(true);
    setError("");
    setIngredients([]);

    try {
      const response = await fetch("/api/detect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64Image }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to detect ingredients");
      }

      setIngredients(data.ingredients);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to process image");
    } finally {
      setLoading(false);
    }
  };

  const resetScan = () => {
    setImagePreview(null);
    setIngredients([]);
    setError("");
    setShowRecipeChat(false);
  };

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="gradient-text">Scan</span> Your Ingredients
          </h1>
          <p className="text-[#a1a1aa] max-w-xl mx-auto">
            Take a photo or upload an image of your ingredients, and our AI will identify them instantly.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Camera/Upload */}
          <div className="space-y-6">
            {/* Camera/Image Preview Area */}
            <div className="relative aspect-[4/3] rounded-2xl bg-[#111118] border border-[#1e1e2e] overflow-hidden">
              {showCamera ? (
                <>
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
                    <button
                      onClick={captureImage}
                      className="p-4 rounded-full bg-gradient-to-r from-[#8b5cf6] to-[#3b82f6] text-white hover:opacity-90 transition-all"
                    >
                      <Camera className="w-6 h-6" />
                    </button>
                    <button
                      onClick={stopCamera}
                      className="p-4 rounded-full bg-[#1e1e2e] text-white hover:bg-[#2e2e3e] transition-all"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                </>
              ) : imagePreview ? (
                <>
                  <img
                    src={imagePreview}
                    alt="Captured"
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={resetScan}
                    className="absolute top-4 right-4 p-2 rounded-full bg-[#1e1e2e]/80 text-white hover:bg-[#2e2e3e] transition-all"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="p-4 rounded-full bg-[#1e1e2e] mb-4">
                    <Camera className="w-8 h-8 text-[#71717a]" />
                  </div>
                  <p className="text-[#71717a] text-center">
                    Take a photo or upload an image
                  </p>
                </div>
              )}

              {loading && (
                <div className="absolute inset-0 bg-[#0a0a0f]/80 flex items-center justify-center">
                  <div className="text-center">
                    <Loader2 className="w-8 h-8 text-[#8b5cf6] animate-spin mx-auto mb-3" />
                    <p className="text-[#a1a1aa]">Analyzing ingredients...</p>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            {!showCamera && !imagePreview && (
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={startCamera}
                  className="flex items-center justify-center gap-2 p-4 rounded-xl bg-gradient-to-r from-[#8b5cf6] to-[#3b82f6] text-white font-medium hover:opacity-90 transition-all"
                >
                  <Camera className="w-5 h-5" />
                  Open Camera
                </button>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center justify-center gap-2 p-4 rounded-xl bg-[#1e1e2e] border border-[#2e2e3e] text-white font-medium hover:bg-[#2e2e3e] transition-all"
                >
                  <Upload className="w-5 h-5" />
                  Upload Image
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>
            )}

            {/* Reset Button */}
            {imagePreview && !loading && (
              <button
                onClick={resetScan}
                className="w-full flex items-center justify-center gap-2 p-4 rounded-xl bg-[#1e1e2e] border border-[#2e2e3e] text-white font-medium hover:bg-[#2e2e3e] transition-all"
              >
                <RefreshCw className="w-5 h-5" />
                Scan Another Image
              </button>
            )}
          </div>

          {/* Right Column - Results */}
          <div className="space-y-6">
            {/* Detected Ingredients */}
            <div className="rounded-2xl bg-[#111118] border border-[#1e1e2e] p-6">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-[#8b5cf6]" />
                <h2 className="text-lg font-semibold">Detected Ingredients</h2>
              </div>

              {error && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 mb-4">
                  {error}
                </div>
              )}

              {ingredients.length > 0 ? (
                <div className="space-y-2">
                  {ingredients.map((ingredient, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 rounded-xl bg-[#1e1e2e] border border-[#2e2e3e]"
                    >
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#8b5cf6] to-[#3b82f6]" />
                      <span className="capitalize">{ingredient}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[#71717a] text-center py-8">
                  {loading
                    ? "Detecting ingredients..."
                    : "No ingredients detected yet. Scan an image to get started."}
                </p>
              )}
            </div>

            {/* Get Recipes Button */}
            {ingredients.length > 0 && (
              <button
                onClick={() => setShowRecipeChat(true)}
                className="w-full flex items-center justify-center gap-2 p-4 rounded-xl bg-gradient-to-r from-[#8b5cf6] to-[#3b82f6] text-white font-semibold hover:opacity-90 hover:shadow-lg hover:shadow-[#8b5cf6]/25 transition-all"
              >
                <ChefHat className="w-5 h-5" />
                Get Recipe Suggestions
              </button>
            )}
          </div>
        </div>

        {/* Recipe Chat Modal */}
        {showRecipeChat && (
          <RecipeChat
            ingredients={ingredients}
            onClose={() => setShowRecipeChat(false)}
          />
        )}
      </div>
    </div>
  );
}
