const express = require('express');

const cors = require('cors');
const swaggerUi = require('swagger-ui-express');

const config =  require('./config');
const products =  require('./routes/products/network');
const errors = require('./network/errors');
const swaggerDoc = require('./swagger.json');

const app = express();

app.use(cors());
app.options('*', cors());

app.use(express.json());

// Setting up the public directory
app.use(express.static('./public'));

//ROUTER
app.use('/api/product', products);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

//Manage errors automaticaly
app.use(errors);

app.listen(config.api.port, () => {
    console.log('Api listen in port ', config.api.port)
});
