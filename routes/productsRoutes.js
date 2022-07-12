const { Router } = require('express');
const productsController = require('../controllers/productController');

const productRoutes = Router();

productRoutes.get('/', productsController.getAll);
productRoutes.get('/:id', productsController.getByID);
productRoutes.post('/', productsController.add);

module.exports = productRoutes;