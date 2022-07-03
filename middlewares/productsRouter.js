const express = require('express');

const Products = require('../controllers/productsController');
const productsValidation = require('./productsValidation');

const router = express.Router();

router.get('/', Products.getProducts);

router.get('/:id', Products.getProductById);

router.post('/', productsValidation, Products.createProduct);

router.put('/:id', productsValidation, Products.updateProduct);

router.delete('/:id', Products.deleteProduct);

module.exports = router;
