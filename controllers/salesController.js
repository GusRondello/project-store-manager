const saleServices = require('../services/salesService');

const salesController = {
  async add(req, res) {
    const product = req.body;
    const productID = product.map(({ productId }) => productId);

    const errorMessage = await saleServices.checkProductId(productID);
    if (errorMessage) {
      return res.status(404).json({ message: errorMessage });
    }
    const id = await saleServices.add(product);
    const saleProduct = {
      id,
      itemsSold: product,
    };
    return res.status(201).json(saleProduct);
  },
  async getAll(_req, res) {
    try {
      const sales = await saleServices.getAll();
      res.status(200).json(sales);
    } catch (error) {
      res.status(404).json({ message: 'Sale not found' });
    }
  },
  async getByID(req, res) {
    try {
      const { id } = req.params;
      const sale = await saleServices.getByID(id);
      if (sale.length === 0) throw new Error('Sale not found');
      res.status(200).json(sale);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
};

module.exports = salesController;