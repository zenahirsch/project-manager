var express = require('express');
var bodyParser = require('body-parser');
var moment = require('moment');

// Middleware
var handlebars = require('./src/middleware/handlebars.js');
var database = require('./src/middleware/database.js');

// Routes
var index = require('./src/routes/index.js');

var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware
app.use(handlebars);
app.use(database);

// Routes
app.use('/', index);

app.use(express.static('./src/static'));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});