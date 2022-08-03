const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const sinon = require('sinon');
const connection = require('../../../db/connection');
const productsModel = require('../../../models/productsModel');

chai.use(chaiAsPromised);

describe('ProductModels testes: ', () => { 
  
  const products = [
    { id: 1, name: 'Martelo de Thor' },
    { id: 2, name: 'Traje de encolhimento' },
    { id: 3, name: 'Escudo do Capitão América' }
  ];

  describe('#getAll', () => { 
    beforeEach(() => {
      sinon.restore();
    });

    it('Retorna um array', async () => { 
      sinon.stub(connection, 'query').resolves([products]);
      const getAllProducts = await productsModel.getAll();
      chai.expect(getAllProducts).to.be.an('array');
    }); 

    it('Retorna um array com os produtos da database', async () => { 
      sinon.stub(connection, 'query').resolves([products]);
      const getAllProducts = await productsModel.getAll();
      chai.expect(getAllProducts).to.be.deep.equal(products);
    });
  });

  describe('#getByID', () => { 
    beforeEach(() => {
      sinon.restore();
    });

    it('Retorna um objeto', async () => { 
      sinon.stub(connection, 'query').resolves([products]);
      const getProductByID = await productsModel.getByID();
      chai.expect(getProductByID).to.be.a('object');
    }); 

    it('Retorna um produto especifico', async () => { 
      sinon.stub(connection, 'query').resolves([products]);
      const getProductByID = await productsModel.getByID();
      chai.expect(getProductByID).to.be.deep.equal(products[0]);
    });
  });

   describe('#add', () => { 
    beforeEach(() => {
      sinon.restore();
    });
     
     const newProduct = {
       name: 'Sabre de Luz'
     };

     const { name: productName } = newProduct;

     const productInsertId = [{ insertId: 1 }];

    it('Retorna um numero de id', async () => { 
      sinon.stub(connection, 'query').resolves(productInsertId);
      const addProduct = await productsModel.add(productName);
      chai.expect(addProduct).to.be.a('number');
    }); 

    it('Retorna id com o mesmo valor passado', async () => { 
      sinon.stub(connection, 'query').resolves(productInsertId);
      const addProduct = await productsModel.add(productName);
      chai.expect(addProduct).to.be.equal(1);
    });
   });  
  
  describe('#update', () => { 
    beforeEach(() => {
      sinon.restore();
    });
     
    const mockUpdateProduct = {
       id: 1,
       name: 'Sabre de Luz'
    };
    
    const { id, name } = mockUpdateProduct

    it('Confirma o produto alterado', async () => { 
      sinon.stub(connection, 'query').resolves([{affectedRows: 1}]);
      const updateProduct = await productsModel.update(name, id);
      chai.expect(updateProduct).to.be.equal(1);
    }); 
  });  

  describe('#delete', () => { 
    beforeEach(() => {
      sinon.restore();
    });
     
    const mockDeleteProduct = { id: 2 };
    
    it('Confirma o produto deletadoclear', async () => { 
      sinon.stub(connection, 'query').resolves([{affectedRows: 1}]);
      const deletedProduct = await productsModel.delete(mockDeleteProduct.id);
      chai.expect(deletedProduct).to.be.equal(1);
    }); 
  });  
});