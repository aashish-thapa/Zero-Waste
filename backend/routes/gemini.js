const express = require('express');
const router = express.Router();
const { TextModel } = require('@google/generative-ai');
require('dotenv').config();

// API route for chatbot
router.post('/chat', async (req, res) => {
  const { prompt } = req.body;

  try {
    const model = new TextModel({
      model: 'gemini-1.5-flash',
      apiKey: process.env.apikey,
    });

    const response = await model.generateContent({ prompt });
    res.json({ response: response.text });
  } catch (error) {
    console.error('Error generating response:', error.message);
    res.status(500).json({ error: 'Failed to generate response' });
  }
});

module.exports = router;
