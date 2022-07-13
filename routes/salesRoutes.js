const { Router } = require('express');
const salesController = require('../controllers/salesController');
const { validateBody } = require('../middlewares/salesMiddleware');

const salesRoutes = Router();
salesRoutes.post('/', validateBody, salesController.add);

module.exports = salesRoutes;