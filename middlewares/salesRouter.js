const express = require('express');

const Sales = require('../controllers/salesController');

const router = express.Router();

router.get('/', Sales.getSales);

router.get('/:id', Sales.getSalesById);

module.exports = router;
