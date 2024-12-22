require('dotenv').config();  // Load environment variables

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const ingredientRoutes = require('./routes/ingredients');

// Get DB password from .env file
const pw = process.env.DBPW;

// MongoDB URI (use your username, password, and database name)
const uri = `mongodb+srv://itsmeaashishthapa:${pw}@cluster0.yufgq0u.mongodb.net/ZeroWaste?retryWrites=true&w=majority`;

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection using Mongoose
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Successfully connected to MongoDB Atlas!");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); // Exit the app if DB connection fails
  });

// Routes
app.use('/api/ingredients', ingredientRoutes);

// Default Route
app.get('/', (req, res) => {
  res.send('Zero-Waste Kitchen Assistant Backend is running!');
});

// Start Server
const PORT = process.env.PORT ;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
