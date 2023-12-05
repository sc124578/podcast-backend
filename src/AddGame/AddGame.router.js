const express = require('express');
const router = express.Router();
const gameController = require('./AddGame.controller');

// In your router file
router.get('/api/games', gameController.getGames);
router.post('/api/addgame', gameController.addGame);
router.delete('/api/deletegame/:id', gameController.deleteGame);

module.exports = router;
