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

module.exports = {
  getSales,
  getSalesById,
  createSale,
};
