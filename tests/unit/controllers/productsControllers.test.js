const sinon = require('sinon');
const { expect } = require('chai');

const productsService = require('../../../services/productsService');
const productsController = require('../../../controllers/productsController');
const { beforeEach, afterEach } = require('mocha');

describe('Controller de Products:', () => {
  describe('1 - Lista todos os produtos do db:', () => {
    describe('1.1 - Caso de sucesso:', () => {
      const req = {};
      const res = {};
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
        req.body = {};
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(productsService, 'getProducts').resolves(model);
      });

      afterEach(() => {
        productsService.getProducts.restore();
      });

      it('Será validado que é retornado status 200', async () => {
        await productsController.getProducts(req, res);
        expect(res.status.calledWith(200)).to.be.equal(true);
      });

      it('Será validado que todos os produtos foram retornados', async () => {
        await productsController.getProducts(req, res);
        expect(res.json.calledWith(model)).to.be.equal(true);
      });
    });

    describe('1.2 - Caso de falha:', () => {
      const req = {};
      const res = {};

      beforeEach(() => {
        req.body = {};
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(productsService, 'getProducts').resolves(null);
      });

      afterEach(() => {
        productsService.getProducts.restore();
      });

      it('Será validado que é retornado status 404', async () => {
        await productsController.getProducts(req, res);
        expect(res.status.calledWith(404)).to.be.equal(true);
      });
      it('Será validado que é retornada a mensagem "No products found"', async () => {
        await productsController.getProducts(req, res);
        expect(res.json.calledWith({ message: 'No products found' })).to.be.equal(true);
      });
    });
  });

  describe('2 - Busca um produto por Id:', () => {
    describe('2.1 - Caso de sucesso:', () => {
      const idMock = 1;
      const req = {};
      const res = {};
      const model = [
        {
          "id": 1,
          "name": "produto A",
          "quantity": 10
        }
      ];

      beforeEach(() => {
        req.body = {};
        req.params = { idMock };
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(productsService, 'getProductById').resolves(model);
      });

      afterEach(() => {
        productsService.getProductById.restore();
      });

      it('Será validado que é retornado status 200', async () => {
        await productsController.getProductById(req, res);
        expect(res.status.calledWith(200)).to.be.equal(true);
      });

      it('Será validado que é retornado o produto buscado', async () => {
        await productsController.getProductById(req, res);
        expect(res.json.calledWith(model)).to.be.equal(true);
      });
    });

    describe('2.2 - Caso de falha:', () => {
      const idMock = 2;
      const req = {};
      const res = {};

      beforeEach(() => {
        req.body = {};
        req.params = { idMock };
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(productsService, 'getProductById').resolves(null);
      });

      afterEach(() => {
        productsService.getProductById.restore();
      });

      it('Será validado que é retornado status 404', async () => {
        await productsController.getProductById(req, res);
        expect(res.status.calledWith(404)).to.be.equal(true);
      });

      it('Será validado que é retornada a mensagem "Product not found"', async () => {
        await productsController.getProductById(req, res);
        expect(res.json.calledWith({ message: 'Product not found' })).to.be.equal(true);
      });
    });
  });
});