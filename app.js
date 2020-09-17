const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const sauceRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');
const path = require('path');

const app = express();


mongoose.connect('mongodb+srv://Sandrine:OpenC6@cluster0.newuy.gcp.mongodb.net/SoPekocko?retryWrites=true&w=majority',
   {useNewUrlParser: true,
   useUnifiedTopology: true })
   .then(() => console.log('connexion à MongoDB réussie !'))
   .catch(() => console.log('Connexion à MongoDB échoué !'));



app.use((req, res, next) => {
   res.setHeader('Access-Control-Allow-Origin', '*');
   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
   next();
});

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);


module.exports = app;