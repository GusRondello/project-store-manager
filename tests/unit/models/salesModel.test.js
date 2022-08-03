const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const connection = require('../../../db/connection');
const salesModel = require('../../../models/salesModel');

chai.use(chaiAsPromised);

describe('SalesModels testes: ', () => { 
  beforeEach(() => {
    sinon.restore();
  });

  const mockedSales = [
      { saleId: 1, productId: 1, quantity: 1 },
      { saleId: 1, productId: 2, quantity: 5 },
      { saleId: 2, productId: 3, quantity: 2 },
      { saleId: 3, productId: 1, quantity: 1 },
      { saleId: 3, productId: 2, quantity: 1 },
      { saleId: 3, productId: 3, quantity: 2 },
    ];

  describe('#getAll', () => { 
    

    it('Retorna todas as vendas cadastradas', async () => { 
      sinon.stub(connection, 'query').resolves(mockedSales);
      
      const allSales = await salesModel.getAll();

      chai.expect(allSales).to.be.a('object');
    });
  });

  describe('#getByID', () => { 
    
    it('Retorna uma venda especifica pelo id', async () => { 
      sinon.stub(connection, 'query').resolves([mockedSales[0]]);
      
      const idSale = await salesModel.getByID(1);

      chai.expect(idSale).to.be.equal(mockedSales[0]);
    });
  });
});