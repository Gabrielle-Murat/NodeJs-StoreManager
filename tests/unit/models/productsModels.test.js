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

  describe('3 - Cadastra um novo produto no db:', () => {
    const newProductMock = {
      name: 'produto A',
    };

    const { name: nameMock } = newProductMock;
    const model = [{ insertId: 1 }];

    beforeEach(async () => {
      sinon.stub(connection, 'execute').resolves(model);
    });

    afterEach(async () => {
      connection.execute.restore();
    });

    it('Será validado que é retornado um objeto', async () => {
      const received = await productsModel.createProduct(nameMock);
      expect(received).to.be.an('object');
    });

    it('Será validado que o objeto retornado possui as chaves id e name', async () => {
      const received = await productsModel.createProduct(nameMock);
      expect(received).to.include.all.keys('id', 'name');
    });

    it('Será validado que o valor da chave id corresponde ao id do produto criado', async () => {
      const received = await productsModel.createProduct(nameMock);
      expect(received.id).to.be.equal(1);
    });

    it('Será validado que o valor da chave name corresponde ao nome enviado no corpo da requisição', async () => {
      const received = await productsModel.createProduct(nameMock);
      expect(received.name).to.be.equal('produto A');
    });
  });

  describe('4 - Atualiza um produto no db:', () => {
    const model = {
      id: 1,
      name: 'produto A',
    };
    const { name, id } = model;

    beforeEach(() => {
      sinon.stub(connection, 'execute').resolves(model);
    });

    afterEach(() => {
      connection.execute.restore();
    });

    it('Será validado que é retornado um objeto', async () => {
      const received = await productsModel.updateProduct(name, id);
      expect(received).to.be.an('object');
    });

    it('Será validado que o objeto possui o id correto', async () => {
      const received = await productsModel.updateProduct(name, id);
      expect(received).to.have.property('id', 1);
    });
  });
});
