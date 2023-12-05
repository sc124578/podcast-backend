require('dotenv').config();
const { Client } = require('pg');
const express = require('express');
const gameRouter = require('./AddGame/AddGame.router');
const cors = require('cors');

const app = express();
const PORT = 3001 || process.env.PORT;

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

client.connect();

// Enable CORS for all routes
app.use(cors());

// Parse incoming JSON requests
app.use(express.json());

// Your routes
app.use(gameRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
