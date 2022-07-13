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
  async add(name) {
    const query = 'INSERT INTO StoreManager.products (name) VALUES (?)';
    const [{ insertId }] = await database.query(query, name);
  return insertId;
  },
  async update(name, id) {
    const query = 'UPDATE StoreManager.products SET name = ? WHERE id = ?;';
    const [{ affectedRows }] = await database.query(query, [name, id]);
    return affectedRows;
  },
};

module.exports = productsModel;