require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 3001,
  PGDATABASE: process.env.PGDATABASE,
  PGUSER: process.env.PGUSER,
  PGPASSWORD: process.env.PGPASSWORD,
  PGHOST: process.env.PGHOST,
  PGPORT: process.env.PGPORT,
  PGURL: process.env.PGURL
}