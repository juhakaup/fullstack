const cors = require('cors');
const express = require('express');
const app = express();

const journeysRouter = require('./controllers/journeys');
const stationRouter = require('./controllers/stations');

app.use(express.json());
app.use(cors())

app.use('/journeys', journeysRouter);
app.use('/stations', stationRouter);

module.exports = app;