const productsModel = require('../models/productsModel');

const productService = {
  async getAll() {
    const result = await productsModel.getAll();
    return result;
  },
  async getByID(id) {
    const result = await productsModel.getByID(id);
    if (!result) throw new Error('Product not found');
    return result;
  },
};

module.exports = productService;