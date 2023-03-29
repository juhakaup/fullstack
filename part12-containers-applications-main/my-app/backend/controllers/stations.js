const router = require('express').Router();
const { Station, Journey, Sequelize } = require('../models');

// Get all stations
router.get('/', async (req, res) => {
  const { count, rows } = await Station.findAndCountAll();
  res.json({
    content: rows,
    rows: count
  });
})

// Get a single station
router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({success: false, message: 'Station id should be a number'});
  }

  if (id < 1) {
    return res.status(400).json({success: false, message: 'Station id cannot be nagative'});
  }
  
  const station = await Station.findByPk(req.params.id);
  if (station) {
    res.json(station);
  } else {
    return res.status(404).end();
  }
})

router.get('/:id/stats', async (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({success: false, message: 'Station id should be a number'});
  }

  if (id < 1) {
    return res.status(400).json({success: false, message: 'Station id cannot be nagative'});
  }

  // get top stations from the requested station
  const fromThisStation = await Journey.findAll({
    attributes: [
      ['return_station_id', 'id'],
      ['return_station_name', 'name'],
      [Sequelize.fn('COUNT', Sequelize.col('id')), 'count'],
    ],
    where: {
      departure_station_id: id
    },
    group: ['return_station_id', 'return_station_name'],
    order: [
      [Sequelize.literal('count'), 'DESC'],
    ],
    limit: 5
  })

  // get top stations to requested station
  const toThisStation = await Journey.findAll({
    attributes: [
      ['departure_station_id', 'id'],
      ['departure_station_name', 'name'],
      [Sequelize.fn('COUNT', Sequelize.col('id')), 'count'],
    ],
    where: {
      return_station_id: id
    },
    group: ['departure_station_id', 'departure_station_name'],
    order: [
      [Sequelize.literal('count'), 'DESC'],
    ],
    limit: 5
  })

  return res.json({ topDestinations: fromThisStation, topOrigins: toThisStation });
})

router.get('/:id/counts', async (req, res) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({success: false, message: 'Station id should be a number'});
  }

  if (id < 1) {
    return res.status(400).json({success: false, message: 'Station id cannot be nagative'});
  }
  
  const countFrom = await Journey.count({
    where: {
      departure_station_id: id
    }
  });

  const countTo = await Journey.count({
    where: {
      return_station_id: id
    }
  });

  return res.json({journeysFromStation: countFrom, journeysToStation: countTo});
})

module.exports = router
