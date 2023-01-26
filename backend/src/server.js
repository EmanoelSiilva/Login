const app = require('./app');
require('dotenv').config();

const PORT = process.env.PORT || 3306;

app.listen(3000, () => console.log(`Servidor rodando na porta ${PORT}`));