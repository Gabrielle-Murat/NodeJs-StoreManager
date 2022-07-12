const express = require('express');

const Sales = require('../controllers/salesController');
const salesValidation = require('./salesValidation');

const router = express.Router();

router.get('/', Sales.getSales);

router.get('/:id', Sales.getSalesById);

router.post('/', salesValidation, Sales.createSale);

router.delete('/:id', Sales.deleteSale);

module.exports = router;
