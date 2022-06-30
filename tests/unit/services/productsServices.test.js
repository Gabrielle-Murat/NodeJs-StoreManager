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

    it('Será validado que é retornado um array de objetos de products', async () => {
      const received = await productsService.getProducts();
      expect(received).to.be.an('array');
    });

    it('Será validado que o array possui 2 itens', async () => {
      const received = await productsService.getProducts();
      expect(received).to.have.length(2);
    });
  });

});