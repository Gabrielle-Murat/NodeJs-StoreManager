const express = require('express');

const Products = require('../controllers/productsController');

const router = express.Router();

router.get('/', Products.getProducts);

router.get('/:id', Products.getProductById);

module.exports = router;
