const bodyParser = require('body-parser');
const app = require('./app');
require('dotenv').config();

app.use(bodyParser.json());

// não altere esse arquivo, essa estrutura é necessária para à avaliação do projeto

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});

const productsRouter = require('./middlewares/productsRouter');
const salesRouter = require('./middlewares/salesRouter');

app.use('/products', productsRouter);

app.use('/sales', salesRouter);
