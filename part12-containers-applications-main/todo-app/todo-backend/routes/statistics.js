const express = require('express');
const router = express.Router();
const redis = require('../redis');

router.get('/', async (req, res) => {
    let numTodos = await redis.getAsync('added_todos');

    if (!numTodos || isNaN(numTodos)) {
        numTodos = 0;
    }
    res.json( {"added_todos": numTodos} );
})

module.exports = router;
