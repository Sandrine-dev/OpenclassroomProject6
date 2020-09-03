const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


mongoose.connect('mongodb+srv://Sandrine:OpenC6@cluster0.newuy.gcp.mongodb.net/SoPekocko?retryWrites=true&w=majority',
   {useNewUrlParser: true,
   useUnifiedTopology: true })
   .then(() => console.log('connexion à MongoDB réussie !'))
   .catch(() => console.log('Connexion à MongoDB échoué !'));

const app = express();

app.use((req, res, next) => {
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
   next();
});

app.use(bodyParser.json());

app.use((req, res) => {
   res.json({ message: 'Votre requête a bien été reçue !' }); 
});

module.exports = app;


module.exports = app;