const sinon = require('sinon');
const { expect } = require('chai');

const salesService = require('../../../services/salesService');
const salesController = require('../../../controllers/salesController');
const { beforeEach, afterEach } = require('mocha');

describe('Controller de Sales:', () => {
  describe('1 - Lista todas as vendas do db:', () => {
    describe('1.1 - Caso de sucesso:', () => {
      const req = {};
      const res = {};
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
        req.body = {};
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(salesService, 'getSales').resolves(model);
      });

      afterEach(() => {
        salesService.getSales.restore();
      });

      it('Será validado que é retornado status 200', async () => {
        await salesController.getSales(req, res);
        expect(res.status.calledWith(200)).to.be.equal(true);
      });

      it('Será validado que todas as vendas foram retornadas', async () => {
        await salesController.getSales(req, res);
        expect(res.json.calledWith(model)).to.be.equal(true);
      });
    });

    describe('1.2 - Caso de falha', () => {
      const req = {};
      const res = {};

      beforeEach(() => {
        req.body = {};
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(salesService, 'getSales').resolves(null);
      });

      afterEach(() => {
        salesService.getSales.restore();
      });

      it('Será validado que é retornado status 404', async () => {
        await salesController.getSales(req, res);
        expect(res.status.calledWith(404)).to.be.equal(true);
      });

      it('Será validado que é retornada a mensagem "No sales found"', async () => {
        await salesController.getSales(req, res);
        expect(res.json.calledWith({ message: 'No sales found' })).to.be.equal(true);
      });
    });
  });
  
  // describe('2 - Busca vendas por Id:', () => {});
});
