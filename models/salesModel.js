const database = require('../db/connection');

const salesModel = {
  async add() {
    const query = 'INSERT INTO StoreManager.sales (id, date) VALUES (DEFAULT, DEFAULT)';
    const [{ insertId }] = await database.execute(query);
    return insertId;
  },
  async getAll() {
    const query = `
      SELECT 
        salesProducts.sale_id as saleId,
        salesProducts.product_id as productId,
        salesProducts.quantity,
        sales.date
      FROM StoreManager.sales_products as salesProducts
      INNER JOIN StoreManager.sales as sales
      ON salesProducts.sale_id = sales.id
      ORDER BY salesProducts.sale_id, salesProducts.product_id;
    `;
    const [saleList] = await database.query(query);
    return saleList;
  },
  async getByID(id) { 
    const query = `
      SELECT
        sales.date,
        salesProducts.product_id as productId,
        salesProducts.quantity
      FROM StoreManager.sales_products as salesProducts
      INNER JOIN StoreManager.sales as sales
      WHERE salesProducts.sale_id = sales.id
      AND sales.id = ?;
    `;
    const [sale] = await database.query(query, [id]);
    return sale;
  },
  async delete(id) {
    const query = 'DELETE FROM StoreManager.sales WHERE id = ?';
    const [{ affectedRows }] = await database.query(query, [id]);
    return affectedRows;
  },
};

module.exports = salesModel;