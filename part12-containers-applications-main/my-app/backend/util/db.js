const { Sequelize } = require('sequelize');
const { PGDATABASE, PGUSER, PGPASSWORD, PGHOST, PGPORT } = require('./config')

const sequelize = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
  host: PGHOST,
  port: PGPORT,
  dialect: 'postgres'
});

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    return process.exit(1);
  }

  return null;
}

module.exports = { connectToDatabase, sequelize }