const express = require('express');
const exphbs = require('express-handlebars');
require('dotenv').config({path: './config/keys.env'});
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const clientSessions = require('client-sessions');


// MIDDLEWARE
const app = express();
app.use(express.static('public'));
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(clientSessions({
    cookieName: 'session',
    secret: process.env.CLIENT_COOKIE_SECRET,
    duration: 2 * 60 * 1000,
    activeDuration: 1000 * 60
}));

/* mongoose.connect('mongodb+srv://CyberGen:' + process.env.MONGO_ATLAS_DB_PASS + '@livefit.buemj.mongodb.net/Accounts?retryWrites=true&w=majority', {
    useMongoClient: true
}); */

// LOAD CONTROLLERS
const genController = require('./controllers/general');
const accController = require('./controllers/account');


// MAP CONTROLLER
app.use('/', genController);
app.use('/account', accController);

const PORT = process.env.PORT;
app.listen(PORT, () => 
{
    console.log('The server is running!');
});