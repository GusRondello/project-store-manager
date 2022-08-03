const salesController = require('../../../controllers/salesController');
const salesService = require('../../../services/salesService');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');

chai.use(chaiAsPromised);


describe('Sales Controller Testes: ', () => {
  const mockedSales = [
      { saleId: 1, productId: 1, quantity: 1 },
      { saleId: 1, productId: 2, quantity: 5 },
      { saleId: 2, productId: 3, quantity: 2 },
      { saleId: 3, productId: 1, quantity: 1 },
      { saleId: 3, productId: 2, quantity: 1 },
      { saleId: 3, productId: 3, quantity: 2 },
  ];
  describe('#add',  () => {
    beforeEach(() => {
      sinon.restore();
    });

    it('Retorna a nova venda cadastrada e status "201"', async () => {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      const mockedAddSale = [
        { saleId: 4, productId: 1, quantity: 3 },
        { saleId: 4, productId: 2, quantity: 1 },
        { saleId: 4, productId: 3, quantity: 5 }
      ]

      req.body = mockedAddSale;
      
      sinon.stub(salesService, 'add').resolves({ status: 200, json: mockedSales });
      sinon.stub(salesService, 'checkProductId').resolves(mockedAddSale.productId);

      await salesController.add(req, res);
      await salesService.checkProductId(mockedAddSale);

      chai.expect(res.status.calledWith(201)).to.be.equal(true);
    });
  });

  describe('#getAll',  () => {
    beforeEach(() => {
      sinon.restore();
    });

    it('Retorna as vendas cadastradas e status "200"', async () => {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      sinon.stub(salesService, 'getAll').resolves({ status: 200, json: mockedSales }); 

      await salesController.getAll(req, res);

      chai.expect(res.status.calledWith(200)).to.be.equal(true);
    })
  });
  describe('#getByID',  () => {
    it('Retorna a venda de "id" específico e status "200"', async () => {
      const req = {};
      const res = {};

      req.params = { id: 1 };
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      sinon.stub(salesService, 'getByID').resolves({ status: 200, json: mockedSales[0] });

      await salesController.getByID(req, res);

      chai.expect(res.status.calledWith(200)).to.be.equal(true);
    });
  });
});