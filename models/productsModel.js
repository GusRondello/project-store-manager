const database = require('../db/connection');

const productsModel = {
  async getAll() {
    const query = 'SELECT * FROM StoreManager.products';
    const [result] = await database.query(query);
    return result;
  },
  async getByID(id) {
    const query = 'SELECT * FROM StoreManager.products WHERE id = ?';
    const [[product]] = await database.query(query, id);
    return product;
  },
};

module.exports = productsModel;