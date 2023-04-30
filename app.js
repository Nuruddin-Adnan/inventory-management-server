const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

// middleware
app.use(express.json());
app.use(cors());

// routes
const productRoute = require('./routes/product.route');
const brandRoute = require('./routes/brand.route');

app.get('/', (req, res, next) => {
    res.send("Route is working! YaY")
});

// use routes
app.use('/api/v1/product', productRoute);
app.use('/api/v1/brand', brandRoute);

// posting to database using save method
app.post('/api/v1/product',)

module.exports = app;