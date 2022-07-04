const sinon = require('sinon');
const { expect } = require('chai');

const salesModel = require('../../../models/salesModel');
const salesService = require('../../../services/salesService');
const { beforeEach, afterEach } = require('mocha');

describe('Service de Sales:', () => {
  describe('1 - Lista todas as vendas do db:', () => {
    const model = [
      {
        "saleId": 1,
        "date": "2021-09-09T04:54:29.000Z",
        "productId": 1,
        "quantity": 2
      },
      {
        "saleId": 1,
        "date": "2021-09-09T04:54:54.000Z",
        "productId": 2,
        "quantity": 2
      },
    ];

    beforeEach(() => {
      sinon.stub(salesModel, 'getSales').resolves(model);
    });

    afterEach(() => {
      salesModel.getSales.restore();
    });

    it('Será validado que é retornado um array de objetos de vendas', async () => {
      const received = await salesService.getSales();
      expect(received).to.be.an('array');
    });

    it('Será validado que o array possui 2 itens', async () => {
      const received = await salesService.getSales();
      expect(received).to.have.length(2);
    });
  });
  
  describe('2 - Busca vendas por Id:', () => {
    const idMock = 1;
    const model = [
      {
        "date": "2021-09-09T04:54:29.000Z",
        "productId": 1,
        "quantity": 2
      },
      {
        "date": "2021-09-09T04:54:54.000Z",
        "productId": 2,
        "quantity": 2
      },
    ];

    beforeEach(() => {
      sinon.stub(salesModel, 'getSalesById').resolves(model);
    });

    afterEach(() => {
      salesModel.getSalesById.restore();
    });

    it('Será validado que é retornado um array de objetos que representa uma venda', async () => {
      const received = await salesService.getSalesById(idMock);
      expect(received).to.be.an('array');
    });

    it('Será validado que o array possui objetos que representam a venda individualmente', async () => {
      const [received] = await salesService.getSalesById(idMock);
      expect(received).to.be.an('object');
    });

    it('Será validado que o array possui todos os objetos que representam uma venda', async () => {
      const received = await salesService.getSalesById(idMock);
      expect(received).to.have.length(2);
    });

    it('Será validado que os objetos retornados possuem as chaves "date", "productId" e "quantity"', async () => {
      const [received] = await salesService.getSalesById(idMock);
      expect(received).to.include.all.keys('date', 'productId', 'quantity');
    });
  });
});
