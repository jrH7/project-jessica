'user strict';

module.exports = function(app){

  var indexController = require('../controllers/indexController');
  var downloaderController = require('../controllers/downloadController');

  //Gloabl Routes
  app.route('/')
  .post(indexController.forward)
  .get(indexController.forward);

  //Specific routing
  app.route('/download')
  .post(downloaderController.downloadVideo)
  .get(downloaderController.downloaderError);
};
