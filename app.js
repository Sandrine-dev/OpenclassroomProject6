const express = require('express');
const bodyParser = require('body-parser');

const app = express();



app.use('/api/sauces', (req, res, next) => {
   res.status(200).json(stuff);
});

module.exports = app;