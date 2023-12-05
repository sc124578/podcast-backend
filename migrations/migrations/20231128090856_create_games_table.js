exports.up = function(knex) {
  return knex.schema.createTable('games', function (table) {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('platform').notNullable();
    table.integer('year_released').notNullable(); // Update the column name
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('games');
};
