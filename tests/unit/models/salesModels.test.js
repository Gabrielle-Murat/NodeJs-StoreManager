const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
const salesModel = require('../../../models/salesModel');
const { beforeEach, afterEach } = require('mocha');

describe('Model de Sales:', () => {
  describe('1 - Lista todas as vendas do db:', () => {
    const model = [
      [
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
      ],
    ];

    beforeEach(() => {
      sinon.stub(connection, 'execute').resolves(model);
    });

    afterEach(() => {
      connection.execute.restore();
    });

    it('Será validado que é retornado um array de objetos de vendas', async () => {
      const received = await salesModel.getSales();
      expect(received).to.be.an('array');
    });
  });

  describe('2 - Busca vendas por Id:', () => {
    describe('2.1 - Caso de sucesso', () => {
      const idMock = 1;
      const model = [
        [
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
        ],
      ];

      beforeEach(() => {
        sinon.stub(connection, 'execute').resolves(model);
      });

      afterEach(() => {
        connection.execute.restore();
      });

      it('Será validado que é retornado um array de objetos que representa uma venda', async () => {
        const received = await salesModel.getSalesById(idMock);
        expect(received).to.be.an('array');
      });
    });

    describe('2.2 - Caso de falha', () => {
      const idMock = 0;
      const model = [[]];

      beforeEach(() => {
        sinon.stub(connection, 'execute').resolves(model);
      });

      afterEach(() => {
        connection.execute.restore();
      });

      it('Será validado que é retornado "null"', async () => {
        const received = await salesModel.getSalesById(idMock);
        expect(received).to.be.null;
      });
    });
  });
});
