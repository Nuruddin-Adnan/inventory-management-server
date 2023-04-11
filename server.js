const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const colors = require('colors');
const app = require('./app');


// database connection
mongoose.connect(process.env.DATABASE_LOCAL).then(() => {
    console.log(`Database connection is successfully`.green.bold);
})

// server
const port = process.env.port || 8080;

app.listen(port, () => {
    console.log(`App is running on port ${port}`.yellow.bold);
})