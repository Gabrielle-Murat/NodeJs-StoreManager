const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
const productsModel = require('../../../models/productsModel');
const { beforeEach, afterEach } = require('mocha');

describe('Model de Products:', () => {
  describe('1 - Lista todos os produtos do db:', () => {
    const model = [
      [
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
      ],
    ];
    
    beforeEach(async () => {
      sinon.stub(connection, 'execute').resolves(model);
    });

    afterEach(async () => {
      connection.execute.restore();
    });

    it('Será validado que é retornado um array de objetos de produtos', async () => {
      const received = await productsModel.getProducts();
      expect(received).to.be.an('array');
    });
  });

  describe('2 - Busca um produto por Id:', () => {
    const idMock = 1;
    const model = [
      [
        {
          "id": 1,
          "name": "produto A",
          "quantity": 10
        },
      ],
    ];

    beforeEach(async () => {
      sinon.stub(connection, 'execute').resolves(model);
    });

    afterEach(async () => {
      connection.execute.restore();
    });

    it('Será validado que é retornado um objeto', async () => {
      const received = await productsModel.getProductById(idMock);
      expect(received).to.be.an('object');
    });
  });
});
