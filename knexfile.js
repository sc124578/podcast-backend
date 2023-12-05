// knexfile.js
module.exports = {
    development: {
      client: 'pg',
      connection: {
        host: 'bubble.db.elephantsql.com',
        user: 'lzxnznod',
        password: 'X4D5IhSiPkop26J1ii1y3SrC4oomkvfG',
        database: 'lzxnznod',
        port: 5432,
      },
      migrations: {
        tableName: 'knex_migrations',
        directory: './migrations',
      },
    },
  };
  