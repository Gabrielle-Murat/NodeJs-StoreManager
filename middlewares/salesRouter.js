const express = require('express');

const Sales = require('../controllers/salesController');

const router = express.Router();

router.get('/', Sales.getSales);

module.exports = router;
