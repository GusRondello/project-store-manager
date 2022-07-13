const database = require('../db/connection');

const salesModel = {
  async add() {
    const query = 'INSERT INTO StoreManager.sales (id, date) VALUES (DEFAULT, DEFAULT)';
    const [{ insertId }] = await database.execute(query);
    return insertId;
  },
};

module.exports = salesModel;