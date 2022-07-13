const database = require('../db/connection');

const salesModel = {
  async add(saleId, products) {
    const query = `INSERT INTO StoreManager.sales_products 
      (sale_id, product_id, quantity) VALUES ?
    `;
    const list = products.map(({ productId, quantity }) => [saleId, productId, quantity]);
    const [{ affectedRows }] = await database.query(query, [list], true);
    if (!affectedRows) throw new Error('Add Failed');
    return affectedRows;
  },
};

module.exports = salesModel;