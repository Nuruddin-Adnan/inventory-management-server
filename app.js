const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

// middleware
app.use(express.json());
app.use(cors());

// routes
const productRoute = require('./routes/product.route')

app.get('/', (req, res, next) => {
    res.send("Route is working! YaY")
});

// product route
app.use('/api/v1/product', productRoute)

// posting to database using save method
app.post('/api/v1/product',)

module.exports = app;