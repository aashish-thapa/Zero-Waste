import React, { useState } from "react";
import './Recipebot.css'
const { GoogleGenerativeAI } = require("@google/generative-ai");

export function Recipebox(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");

  const genAI = new GoogleGenerativeAI(process.env.REACT_APP_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const fetchResponse = async (input) => {
    try {
      // Construct the prompt
      const prompt = `User said: "${input}".  Give user a recipe from these ingredients(Do not complain anything Just the proper recipe. Remember our goal is to protect kitchen ingredient from wasting)`;

      // Call the Gemini API
      const result = await model.generateContent(prompt);

      // Extract and return the response
      return result.response.text();
    } catch (error) {
      console.error("Error fetching response from Gemini:", error);
      // Handle quota limit exceeded error
      if (error.response && error.response.status === 429) {
        return "Quota exceeded. Please try again later.";
      }
      return "Sorry, I couldn't process your request. Please try again.";
    }
  };

  const handleChatOpen = async () => {
    setIsOpen(true);

    if (messages.length === 0) {
      // Construct the initial prompt
      const initialPrompt = "Start the conversation by sharing a zero-waste cooking tip or recipe idea.";

      // Fetch the bot's initial response
      const botReply = await fetchResponse(props.sharedData);

      // Add the bot's initial message to the chat
      setMessages([{ sender: "bot", text: botReply }]);
    }
  };

  const handleChatClose = () => {
    setIsOpen(false);
    setMessages([]);
  };

  const handleSend = async () => {
    if (!userInput.trim()) return;

    // Add user's message to the chat
    const newMessages = [...messages, { sender: "user", text: userInput }];
    setMessages(newMessages);
    setUserInput("");

    // Fetch bot response
    const botReply = await fetchResponse(userInput);
    setMessages([...newMessages, { sender: "bot", text: botReply }]);
  };

  return (
    <div>
      {/* Floating Chat Button */}
      <button
        onClick={handleChatOpen}
        className="chat-button"
      >
        💬 Get Recipe
      </button>

      {/* Chatbox */}
      {isOpen && (
        <div className="chatbox">
          {/* Chat Header */}
          <div className="chat-header">
            <span>Zero-Waste Chat</span>
            <button onClick={handleChatClose} className="chat-close-button">
              ✖
            </button>
          </div>

          {/* Chat Messages */}
          <div className="messages">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${message.sender}`}
              >
                {message.text}
              </div>
            ))}
          </div>

          {/* Input Box */}
          <div className="input-box">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Type your message..."
              className="input-field"
            />
            <button
              onClick={handleSend}
              className="send-button"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
