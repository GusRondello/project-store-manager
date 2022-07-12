const productService = require('../services/productService');

const productsController = {
  async getAll(_req, res) {
    const products = await productService.getAll();
    res.status(200).json(products);
  },
  async getByID(req, res) {
    try {
      const { id } = req.params;
      const product = await productService.getByID(id);
      res.status(200).json(product);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
};

module.exports = productsController;