const { Router } = require('express');
const productsController = require('../controllers/productController');
const { validateBody } = require('../middlewares/productsMiddleware');

const productRoutes = Router();

productRoutes.get('/', productsController.getAll);
productRoutes.get('/search', productsController.getByName);
productRoutes.get('/:id', productsController.getByID);

productRoutes.post('/', validateBody, productsController.add);

productRoutes.put('/:id', validateBody, productsController.update);

productRoutes.delete('/:id', productsController.delete);

module.exports = productRoutes;