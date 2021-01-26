const express = require('express');
const helmet = require("helmet");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const hpp = require('hpp');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
const saucesRoutes = require('./routes/saucesRoutes');
const userRoutes = require('./routes/userRoute');
require('dotenv').config({path: process.cwd() + '/.env'});
const app = express();

// Active CORS pour éviter les attaques CSRF
app.use(cors({
    origin: 'http://localhost:4200'
}));

app.use(hpp());

// Securisation entêtes HTTP
app.use(helmet());

mongoose.connect(`mongodb+srv://${process.env.MONGOOSE_ADMIN}:${process.env.MONGOOSE_PWD}@${process.env.MONGOOSE_HOST}/<dbname>?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));


// CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;