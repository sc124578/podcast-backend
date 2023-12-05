require('dotenv').config();
const nodeMailer = require('nodemailer');
const knex = require('knex')(require('../../knexfile').development);
const { addGameToDatabase, deleteGamesFromDatabase, getGamesFromDatabase } = require('./db');

const addGame = async (req, res) => {
  try {
    const { name, platform, year } = req.body;

    
    const newGame = await addGameToDatabase(name, platform, year);

    const transporter = nodeMailer.createTransport({
      service: 'outlook',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER2,
      subject: 'New Game Added',
      text: `A new game "${newGame.name}" has been added to the database.`,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json(newGame);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const getGames = async (req, res) => {
  try {
    // Assuming you have a 'games' table in your database
    const games = await knex.select('*').from('games');

    res.status(200).json(games);
  } catch (error) {
    console.error(`Error fetching games: ${error}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteGame = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const isValidCredentials = authenticateUser(userName, password);

    if (!isValidCredentials) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const gameId = req.params.id; // Extract gameId from request parameters

    const deletedGame = await deleteGamesFromDatabase(gameId);

    if (!deletedGame || !deletedGame.length) {
      return res.status(404).json({ error: 'Game not found' });
    }

    res.status(200).json({ message: 'Game deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Error deleting game ${error}` });
  }
};



const authenticateUser = (userName, password) => {
  // Placeholder logic - replace with actual authentication mechanism
  const validUsernames = process.env.DELETE_USERNAME.split(',');
  const validPasswords = process.env.DELETE_PASSWORD.split(',');

  // Check if the provided username exists and the password is correct
  const index = validUsernames.indexOf(userName);
  return index !== -1 && validPasswords[index] === password;
};



module.exports = { addGame, deleteGame, getGames };
