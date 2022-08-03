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

    it('Retorna um array identico ao da data', async () => { 
      const getAllProducts = await productService.getAll();
      chai.expect(getAllProducts).to.be.equal(mockedData);
    });
  });

  describe('#getByID', () => {
    const mockedProduct = { id: 1, name: 'Martelo de Thor' };

    beforeEach(async  () => {
      sinon.stub(productsModel, 'getByID').resolves(mockedProduct);
    });

    afterEach(async  () => { 
      productsModel.getByID.restore();
    });

    it('Retorna um objeto', async () => { 
      const getAllProducts = await productService.getByID();
      chai.expect(getAllProducts).to.be.a('object');
    });

    it('Retorna um objeto identico ao da data', async () => { 
      const getAllProducts = await productService.getByID();
      chai.expect(getAllProducts).to.be.equal(mockedProduct);
    });

  });

  describe('#add', () => {
    const mockedProduct = { id: 1, name: 'Martelo de Thor' };
    const mockedId = 1;

    beforeEach(async  () => {
      sinon.stub(productsModel, 'add').resolves(mockedId);
    });

    afterEach(async  () => { 
      productsModel.add.restore();
    });
    
    it('Retorna um "id" ', async () => { 
      const id = await productService.add(mockedProduct.name);
      chai.expect(id).to.be.equal(mockedId);
    });

  });

   describe('#update', () => {  
     it('Retorna que o produto foi atualizado ', async () => { 
       const mockedProduct = { id: 1, name: 'Sabre de Luz' };
       
       sinon.stub(productsModel, 'update').resolves(true);

       const updatedProduct = await productService.update(mockedProduct.name, mockedProduct.id);
       chai.expect(updatedProduct).to.be.equal(true);

       productsModel.update.restore();
    });
   });
  
  describe('#delete', () => {  
    it('Retorna que o produto foi removido ', async () => { 
      const mockedProduct = { id: 1, name: 'Sabre de Luz' };
      
      sinon.stub(productsModel, 'delete').resolves(true);

      const deletedProduct = await productService.delete(mockedProduct.id);
      chai.expect(deletedProduct).to.be.equal(true);

      productsModel.delete.restore();
    });
  });
  
});