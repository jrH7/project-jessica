'user strict';

module.exports = function(app){

  var indexController = require('../controllers/indexController');
  var downloaderController = require('../controllers/downloadController');

  //Global Routes
  app.route('*')
  .post(indexController.forward)
  .get(indexController.forward);
};
