const { Router } = require('express');
const productsController = require('../controllers/productController');

const productRoutes = Router();

productRoutes.get('/', productsController.getAll);
productRoutes.get('/:id', productsController.getByID);

module.exports = productRoutes;