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
  async add(name) {
    const id = productsModel.add(name);
    return id;
  },
  async update(name, id) {
    const result = await productsModel.update(name, id);
    return result;
  },
  async delete(id) { 
    const result = await productsModel.delete(id);
    return result;
  },
};

module.exports = productService;