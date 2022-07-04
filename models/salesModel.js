const connection = require('./connection');

// conversão de snake_case para camel_case, course dia 23.1
const serialize = (saleData) => ({
  saleId: saleData.sale_id,
  productId: saleData.product_id,
  quantity: saleData.quantity,
  date: saleData.date,
});

// requisito 08

const getSales = async () => {
  const getSalesQuery = `
    SELECT
      sp.sale_id,
      s.date,
      sp.product_id,
      sp.quantity
    FROM
      StoreManager.sales AS s
        INNER JOIN
      StoreManager.sales_products AS sp ON s.id = sp.sale_id;
  `;

  const [salesList] = await connection.execute(getSalesQuery);
  
  return salesList.map(serialize);
};

module.exports = {
  getSales,
};
