const knex = require('knex')(require('../../knexfile').development);

const addGameToDatabase = async (name, platform, year) => {
    return await knex('games').insert({ name, platform, year_released: year }).returning('*');
};



const getGamesFromDatabase = async () => {
    return await knex.select("*").from("games")
}

const deleteGamesFromDatabase = async (id) => {
    return await knex("games").where({id}).del().returning("*");
}


module.exports = {
    addGameToDatabase,
    getGamesFromDatabase,
    deleteGamesFromDatabase
}