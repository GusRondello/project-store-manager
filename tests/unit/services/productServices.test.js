const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const productsModel = require('../../../models/productsModel');
const productService = require('../../../services/productService');

chai.use(chaiAsPromised);

describe('ProductServices testes: ', () => { 
  beforeEach(() => {
    sinon.restore();
  });

  describe('#getAll', () => {
    const mockedData = [
      { id: 1, name: 'Martelo de Thor' },
      { id: 2, name: 'Traje de encolhimento' },
      { id: 3, name: 'Escudo do Capitão América' }
    ];

    beforeEach(async  () => {
      sinon.stub(productsModel, 'getAll').resolves(mockedData);
    });

    afterEach(async  () => { 
      productsModel.getAll.restore();
    });

    it('Retorna um array', async () => { 
      const getAllProducts = await productService.getAll();
      chai.expect(getAllProducts).to.be.an('array');
    });

  });
});