const Sales = require('../models/salesModel');
const Products = require('../models/productsModel');

// requisito 08

const getSales = async () => {
  const salesList = await Sales.getSales();

  return salesList;
};

const getSalesById = async (id) => {
  const sales = await Sales.getSalesById(id);

  return sales;
};

// requisito 06

const productIdExistanceCheck = async (saleArray) => {
  const allProducts = await Products.getProducts();

  const allDbProductsIds = allProducts.map((sale) => sale.id);
  const productsIdsFromRequest = saleArray.map((sale) => sale.productId);
  
  const productIdIsNull = productsIdsFromRequest
    .some((id) => !allDbProductsIds.includes(id));
  
  if (productIdIsNull) return null;
};

const createSale = async (saleArray) => {
  const check = await productIdExistanceCheck(saleArray);
  if (check === null) return 'not found';

  const sale = await Sales.createSaleOnTableSales();
  const response = {
    id: sale.insertId,
    itemsSold: saleArray,
  };

  saleArray.forEach(async ({ productId, quantity }) => {
    await Sales.createSaleOnTableSalesProducts(sale.insertId, productId, quantity);
  });

  return response;
};

// requisito 14

const deleteSale = async (saleId) => {
  const checkExistance = await Sales.getSalesById(saleId);

  if (checkExistance === null) return 'not found';

  await Sales.deleteSaleOnTableSalesProducts(saleId);
  await Sales.deleteSaleOnTableSales(saleId);
};

// requisito 16

const updateSale = async (saleId, saleArray) => {
  const checkSaleExistance = await Sales.getSalesById(saleId);
  if (checkSaleExistance === null) return 'Sale not found';

  const checkProductIdExistance = await productIdExistanceCheck(saleArray);
  if (checkProductIdExistance === null) return 'Product not found';
  
  const response = {
    saleId,
    itemsUpdated: saleArray,
  };

  saleArray.forEach(async ({ productId, quantity }) => {
    await Sales.updateSale(productId, saleId, quantity);
  });

  return response;
};

module.exports = {
  getSales,
  getSalesById,
  createSale,
  deleteSale,
  updateSale,
};
