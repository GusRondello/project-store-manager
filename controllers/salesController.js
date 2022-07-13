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
};

module.exports = salesController;