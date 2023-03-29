const { PGUSER, PGPASSWORD, PGHOST, PGDATABASE, PGPORT } = require('../util/config');
module.exports = 
{
  "development": {
    "username": PGUSER,
    "password": PGPASSWORD,
    "database": PGDATABASE,
    "host": PGHOST,
    "port": PGPORT,
    "dialect": "postgres",
    "logging": false
  },
  "test": {
    "username": PGUSER,
    "password": PGPASSWORD,
    "database": PGDATABASE,
    "host": PGHOST,
    "port": PGPORT,
    "dialect": "postgres"
  },
  "production": {
    "username": PGUSER,
    "password": PGPASSWORD,
    "database": PGDATABASE,
    "host": PGHOST,
    "port": PGPORT,
    "dialect": "postgres"
  }
};