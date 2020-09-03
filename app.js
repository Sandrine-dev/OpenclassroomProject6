const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use((req, res, next) => {
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
   next();
});

app.use(bodyParser.json());

app.post('api/sauces',(req, res, next) => {
   console.log(req.body);
});

app.use('/api/sauces', (req, res, next) => {
   res.status(200).json(stuff);
});

module.exports = app;