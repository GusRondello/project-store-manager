const productsModel = require('../models/productsModel');
const salesModel = require('../models/salesModel');
const salesProducstModel = require('../models/salesProductModel');

const saleServices = {
  async add(products) {
    const saleId = await salesModel.add();
    await salesProducstModel.add(saleId, products);
    return saleId;
  },

  async checkProductId(idList) {
    const products = await productsModel.getAll();
    const productsIds = products.map(({ id }) => id);
    let errorMessage;
    idList.forEach((id) => {
      if (!productsIds.includes(id)) {
        errorMessage = 'Product not found';
      }
    });
    return errorMessage;
  },

  async getAll() {
    const result = await salesModel.getAll();
    return result;
  },
  
  async getByID(id) {
    const result = await salesModel.getByID(id);
    return result;
  },
};

module.exports = saleServices;