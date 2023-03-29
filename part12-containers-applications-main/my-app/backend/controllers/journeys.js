const router = require('express').Router();
const { Journey } = require('../models')

// Journey route
router.get('/', async (req, res) => {
  reqPage = parseInt(req.query.page);
  reqSize = parseInt(req.query.size);
  reqSortBy = req.query.field;
  reqSortOrder = req.query.order;
  sortFields = ['departure', 'return', 'distance', 'duration'];

  const page = (!isNaN(reqPage) && reqPage > 0) ? reqPage : 0;
  const size = (!isNaN(reqSize) && reqSize > 0 && reqSize <= 100 ? reqSize : 15)
  const sortBy = sortFields.includes(reqSortBy) ? reqSortBy : 'departure';
  const order = reqSortOrder == 'desc' ? 'DESC' : 'ASC';

  const { count, rows } = await Journey.findAndCountAll({
    order: [
      [sortBy, order],
    ],
    offset: page * size,
    limit: size
  });

  return res.json({
    content: rows,
    rows: count
  });
})

module.exports = router
