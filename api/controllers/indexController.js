'use strict';

//Common API to forward all requests asynch
exports.forward = function(req,res){
  setTimeout(parseRequest, 0, req, res);
};
//Common API to Start all Server routines
exports.start = function()
{
  setTimeout(startThreads, 0);
}

//Request parser
function parseRequest(req,res)
{
  console.log("*************************************************")
  console.log("indexController.js | parseRequest() | jessica received a request from "+req.hostname);
  res.status(200).send("jessica has received your request");


  //Identify the controller
  var downloadController = require('../controllers/downloadController');
  var utility = require("../common/utility");

  var status = downloadController.isDownloadRequest(req);
  if("success" == status)
  {
      console.log("indexController.js | parseRequest() | forwarding request to downloadController");
      downloadController.downloadVideo(req,res);
      return;
  }

  console.log("indexController.js | parseRequest() | jessica does not understand this");
  if(req.body.response_url)//Not validating URL here
    utility.sendResponseToRedirectURL(req.body.response_url,"jessica does not understand this");
}

//Server routines
function startThreads()
{
  var threadController = require('./threadController')
  threadController.initialize();
}
