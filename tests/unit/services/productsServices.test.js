const sinon = require('sinon');
const { expect } = require('chai');

const productsModel = require('../../../models/productsModel');
const productsService = require('../../../services/productsService');
const { beforeEach, afterEach } = require('mocha');

describe('Service de Products:', () => {
  describe('1 - Lista todos os produtos do db:', () => {
    const model = [
      {
        "id": 1,
        "name": "produto A",
        "quantity": 10
      },
      {
        "id": 2,
        "name": "produto B",
        "quantity": 20
      },
    ];

    beforeEach(() => {
      sinon.stub(productsModel, 'getProducts').resolves(model);
    });

    afterEach(() => {
      productsModel.getProducts.restore();
    });

    it('Será validado que é retornado um array de objetos de produtos', async () => {
      const received = await productsService.getProducts();
      expect(received).to.be.an('array');
    });

    it('Será validado que o array possui 2 itens', async () => {
      const received = await productsService.getProducts();
      expect(received).to.have.length(2);
    });
  });

  describe('2 - Busca um produto por Id:', () => {
    const idMock = 1;
    const model = {
      "id": 1,
      "name": "produto A",
      "quantity": 10
    };

    beforeEach(() => {
      sinon.stub(productsModel, 'getProductById').resolves(model);
    });

    afterEach(() => {
      productsModel.getProductById.restore();
    });

    it('Será validado que é retornado um objeto', async () => {
      const received = await productsService.getProductById(idMock);
      expect(received).to.be.an('object');
    });

    it('Será validado que o objeto retornado possui as chaves "id", "name" e "quantity"', async () => {
      const received = await productsService.getProductById(idMock);
      expect(received).to.include.all.keys('id', 'name', 'quantity');
    });

    it('Será validado que o objeto retornado possui o id correto', async () => {
      const received = await productsService.getProductById(idMock);
      expect(received).to.have.property('id', 1);
    });
  });

  describe('3 - Cadastra um novo produto no db:', () => {
    const newProductMock = {
      id: 1,
      name: 'produto A',
    };
    const { name: nameMock } = newProductMock;

    beforeEach(() => {
      sinon.stub(productsModel, 'createProduct').returns(newProductMock);
    });

    afterEach(() => {
      productsModel.createProduct.restore();
    });

    it('Será validado que é retornado um objeto', async () => {
      const received = await productsService.createProduct(nameMock);
      expect(received).to.be.an('object');
    });
  });

  describe('4 - Atualiza um produto no db:', () => {
    describe('4.1 - Caso de sucesso:', () => {
      const model = {
        id: 2,
        name: 'produto C',
      };
  
      const updatedProductMock = {
        id: 2,
        name: 'produto B',
      };
  
      const { name, id } = updatedProductMock;

      beforeEach(() => {
        sinon.stub(productsModel, 'getProductById').resolves(model);
        sinon.stub(productsModel, 'updateProduct').resolves(updatedProductMock);
      });

      afterEach(() => {
        productsModel.getProductById.restore();
        productsModel.updateProduct.restore();
      });

      it('Será validado que é retornado um objeto', async () => {
        const received = await productsService.updateProduct(name, id);
        expect(received).to.be.an('object');
      });
    });
    
    describe('4.2 - Caso de falha:', () => {
      const reqBodyMock = {
        id: 3,
        name: 'produto C',
      };
  
      const { name, id } = reqBodyMock;
      const responseMock = 'not found';

      beforeEach(() => {
        sinon.stub(productsModel, 'getProductById').resolves(null);
      });

      afterEach(() => {
        productsModel.getProductById.restore();
      });

      it('Será validado que a mensagem correta é retornada', async () => {
        const received = await productsService.updateProduct(name, id);
        expect(received).to.be.equal(responseMock);
      });
    });
  });

  describe('5 - Deleta um produto no db:', () => {
    describe('5.1 - Caso de sucesso:', () => {
      const idMock = 1;
      const model = {
        id: 1,
        name: 'produto A',
      };

      beforeEach(() => {
        sinon.stub(productsModel, 'getProductById').resolves(model);
        sinon.stub(productsModel, 'deleteProduct').resolves(undefined);
      });

      afterEach(() => {
        productsModel.getProductById.restore();
        productsModel.deleteProduct.restore();
      });

      it('Será validado que o produto foi deletado', async () => {
        const received = await productsService.deleteProduct(idMock);
        expect(received).to.be.undefined;
      });
    });

    describe('5.2 - Caso de falha:', () => {
      const idMock = 0;
      const model = 'not found';

      beforeEach(() => {
        sinon.stub(productsModel, 'getProductById').resolves(null);
      });

      afterEach(() => {
        productsModel.getProductById.restore();
      });

      it('Será validado que a mensagem correta é retornada', async () => {
        const received = await productsService.deleteProduct(idMock);
        expect(received).to.be.equal(model);
      });
    });
  });
});