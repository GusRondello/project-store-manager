const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const productController = require('../../../controllers/productController');
const productService = require('../../../services/productService');

chai.use(chaiAsPromised);

describe('ProductController testes: ', () => {
  beforeEach(() => {
    sinon.restore();
  });

  describe('#getAll', () => {
      

    const mockedProducts = [
      { id: 1, name: 'Martelo de Thor' },
      { id: 2, name: 'Traje de encolhimento' },
      { id: 3, name: 'Escudo do Capitão América' }
    ]

    it('Retorna um array com os produtos', async () => {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      sinon.stub(productService, 'getAll').resolves(mockedProducts);

      await productController.getAll(req, res);

      chai.expect(res.status.calledWith(200)).to.be.equal(true);
    });
  });

  describe('#getByID', () => {
    it('Retorna o produto caso seja encontrado', async () => {
        
      const mockedProduct = [
        { id: 1, name: 'Martelo de Thor' },
      ]

      const req = {};
      const res = {};
      
      req.params = { id: 1 };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      sinon.stub(productService, 'getByID').resolves(mockedProduct);

      await productController.getByID(req, res);

      chai.expect(res.status.calledWith(200)).to.be.equal(true);
    });

    it('Retorna o erro caso nao seja encontrado', async () => {
      const req = {};
      const res = {};

      req.params = { id: 123456 }

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      chai.expect(productController.getByID(req, res)).to.be.rejectedWith(Error);
    });
  });

  describe('#add', () => {
     
    it('Retorna o erro caso body esteja invalido', async () => {
      const req = {};
      const res = {};

      req.body = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub();

      chai.expect(productController.add(req, res)).to.be.rejectedWith(Error);
    });
  });
});