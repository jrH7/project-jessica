'user strict';


var commonUtility = require('../common/utility');
var stringFormat = require('string-format');

exports.controllerID = 0;
exports.initialize = function(id){
  controllerID = id;
  return "success"
}
exports.download = function(req,res){
  var status = validateDownloadCommand(req);
  if("success" == status){
    console.log("downloadController.js | download() | download start for URL | " +req.body.text);
    status = this.downloadVideoFromCommand(req.body.text,{});
    if("success" == status){
      console.log("downloadController.js | download() | download success for URL | " +req.body.text);
      commonUtility.sendResponseToRedirectURL(req.body.response_url,stringFormat(commonUtility.constants.slackMessages.videoDownloadComplete,req.body.text));
    }
    else{
      console.log("downloadController.js | download() | download failed for URL | " +req.body.text+" | error | "+status);
      commonUtility.sendResponseToRedirectURL(req.body.response_url,stringFormat(commonUtility.constants.slackMessages.videoDownloadFailed,req.body.text));
    }
  }
  else {
    console.log("downloadController.js | download() | jessica failed to validate /download command | " + status);;
    if(validateURL(req.body.response_url) && validateURL(req.body.text))
      commonUtility.sendResponseToRedirectURL(req.body.response_url,stringFormat(commonUtility.constants.slackMessages.videoDownloadURLValidationFailure,req.body.text));
  }
};
exports.downloadVideoFromCommand = function(url,responseObj)
{
  if(!url)
    return "downloadController.js | downloadVideoFromCommand() | empty url ";

  try
  {
    var execSync = require('child_process').execSync;

    var cmd = commonUtility.constants.controllers[exports.controllerID].makeDirectoryCommand + commonUtility.constants.controllers[exports.controllerID].userFolderName;
    cmd = cmd + ";"+ commonUtility.constants.controllers[exports.controllerID].changeDirectoryCommand + commonUtility.constants.controllers[exports.controllerID].userFolderName;
    cmd = cmd +";"+commonUtility.constants.controllers[exports.controllerID].downloadCommand + url;

    responseObj.sysOut = execSync(cmd);
  } catch (e) {
    return "downloadController.js | downloadVideoFromCommand() | download failed | " + e;
  }
  return "success";
}

function validateDownloadCommand(req)
{
  var status = commonUtility.validateRequest(req);
  if( status != "success" )
  {
    return status;
  }

  status = commonUtility.validateURL(req.body.text);
  if( !req.body.text || status != "success" )
  {
    return "Invalid URL";
  }

  status  = commonUtility.validateURL(req.body.response_url);
  if( !req.body.response_url || status != "success")
  {
    return "Invalid URL";
  }
  return "success";
}
