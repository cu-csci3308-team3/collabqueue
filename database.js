var pgp = require('pg-promise')();

const dbConfig = {
   host: 'localhost',
   port: 5432,
   database: 'jampool',
   user: 'will',
   password: '' // TODO: Fill in your PostgreSQL password here.
                // Use empty string if you did not set a password
};

var db = pgp(dbConfig);

db.any('delete from songs;')

module.exports = db;