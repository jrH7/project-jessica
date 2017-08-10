'use strict';

var utility = require("../common/utility");

//Common API to forward all requests asynch
exports.forward = function(req,res){
  setTimeout(parseRequest, 0, req, res);
};
//Common API to Start all Server routines
exports.start = function(){
  setTimeout(initialize, 0);
}

//Request parser
function parseRequest(req,res){
  console.log("*************************************************")
  console.log("indexController.js | parseRequest() | jessica received a request from "+req.hostname);
  res.status(200).send("jessica has received your request");

  //Identify the controller
  for( var i = 0; i < exports.noOfControllers ; i++)
  {
    if("success" == canHandleCommand(req,i))
    {
      var currentController = exports.controllers[i];
      currentController[req.body.command.substr(1)](req,res);
      return;
    }
  }

  console.log("indexController.js | parseRequest() | jessica does not understand this");
  if(req.body.response_url)//Not validating URL here
    utility.sendResponseToRedirectURL(req.body.response_url,"jessica does not understand this");
}

//Initialize controllers
function initialize()
{
  exports.controllers = [];
  exports.noOfControllers = utility.constants.controllers.length;

  for( var i = 0; i < exports.noOfControllers ; i++)
  {
    var currentControllerName = utility.constants.controllers[i].id;
    var currentController = require('../controllers/'+currentControllerName);
    if("success" == currentController.initialize(i))
    {
      console.log("indexController.js | initialize() | " + currentControllerName + " initialized")
      exports.controllers.push(currentController);
    }
  }
}

function canHandleCommand(httpReq,controllerId){
  if(!httpReq.body.command)
    return "failure";

  var commmandIndex = utility.constants.controllers[controllerId].commands.indexOf(httpReq.body.command.toLowerCase());
  return commmandIndex==-1?"failure":"success";
};
