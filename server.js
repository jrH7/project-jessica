var express = require('express'),
app = express(),
port = process.env.PORT || 3000,
bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/route');
routes(app);

app.listen(port);
console.log('server.js | global() | jessica listening on port ' +port)

//Start server routines
var indexController = require('./api/controllers/indexController')
indexController.start();
