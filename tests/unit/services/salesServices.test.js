const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const salesService = require('../../../services/salesService');
const salesModel = require('../../../models/salesModel');

chai.use(chaiAsPromised);


describe('SalesServide Test', () => {
  const mockedSalesProducts = [
      { date: "2021-09-09T04:54:29.000Z",
        productId: 1,
        quantity: 2 },
      { date: "2021-09-09T04:54:29.000Z",
        productId: 2,
        quantity: 5 },
      { date: "2021-09-09T04:54:54.000Z",
        productId: 2,
        quantity: 5 },
      { date: "2021-09-09T04:55:09.000Z",
        productId: 2,
        quantity: 5 },
      { date: "2021-09-09T04:55:09.000Z",
        productId: 2,
        quantity: 5 },
      { date: "2021-09-09T04:55:09.000Z",
        productId: 2,
        quantity: 5 }
    ];
  describe('#getAll',  () => {
    beforeEach(() => {
      sinon.restore();
    });

    it('Retorna todos as vendas cadastradas', async () => {
      sinon.stub(salesModel, 'getAll').returns(mockedSalesProducts);
      const allSales = await salesService.getAll();

      chai.expect(allSales.length).to.be.equal(6);
    })
  });

  describe('#getByID',  () => {
    it('Retorna a venda com ID específico', async () => {
      sinon.stub(salesModel, 'getByID').returns(mockedSalesProducts[0]);
      const saleId = await salesService.getByID(1);

      chai.expect(saleId).to.be.a('object');
    })
  });
});