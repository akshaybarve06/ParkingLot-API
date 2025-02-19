const express = require('express');
const bodyParser = require('body-parser');
const port= 3000

// create express app
const app = express();

// parse requests of content-type 
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
})

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to Parking Lot API."});
});

// Require User routes
require('./routes/user.routes')(app);

// listen for requests
app.listen(port, () => {
    console.log("Server is listening on port "+port);
});

module.exports=app