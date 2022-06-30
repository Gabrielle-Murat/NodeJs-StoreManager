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
});