'user strict';

var downloaderConstants = {
  //REQUEST
  token: "guk3piUy7vNFuFNxEucxUC8j",
  user_names: ['sanchithanda'],
  command:'/download',

  //Internal Commands
  makeDirectoryCommand:'mkdir -p ~/Desktop/Songs/',
  changeDirectoryCommand:'cd ~/Desktop/Songs/',
  userFolderName:'sanchit',
  downloadCommand:'youtube-dl --download-archive -----ARCHIVE------.txt --no-post-overwrites -ciwx --audio-format mp3 -o "%(title)s.%(ext)s" '
};
exports.downloadVideo = function(req,res){
  var utility = require('../common/utility');
  var status = validateRequest(req);

  if("success" == status){
    console.log("downloadController.js | downloadVideo() | download start for URL | " +req.body.text);
    status = this.downloadVideoFromCommand(req.body.text,{});
    if("success" == status){
      console.log("downloadController.js | downloadVideo() | download success for URL | " +req.body.text);
      utility.sendResponseToRedirectURL(req.body.response_url,"jessica executed /download "+req.body.text);
    }
    else{
      console.log("downloadController.js | downloadVideo() | download failed for URL | " +req.body.text+" | error | "+status);
      utility.sendResponseToRedirectURL(req.body.response_url,"jessica failed to execute /download "+req.body.text);
    }
  }
  else {
    console.log("downloadController.js | downloadVideo() | jessica failed to validate /download command | " + status);;
    if(validateURL(req.body.response_url) && validateURL(req.body.text))
      utility.sendResponseToRedirectURL(req.body.response_url,"jessica failed to validate /download command | " + status);
  }
};
exports.downloaderError = function(req,res){
  var status = "downloadController.js | downloaderError() | jessica does not support GET request for /download command";
  console.log(status);
  res.status(200).send({response:status});
};

function validateRequest(req)
{
  if( !req.body.token || downloaderConstants.token != req.body.token )
  {
    return "Invalid token";
  }

  if( !req.body.user_name|| downloaderConstants.user_names.indexOf(req.body.user_name.toLowerCase()) == -1 )
  {
    return "Invalid userName";
  }

  if( !req.body.command || downloaderConstants.command != req.body.command.toLowerCase() )
  {
    return "Invalid command";
  }

  var status = validateURL(req.body.text);
  if( !req.body.text || status != "success" )
  {
    return "Invalid URL";
  }

  status  = validateURL(req.body.response_url);
  if( !req.body.response_url || status != "success")
  {
    return "Invalid URL";
  }

  return "success"
}

function validateURL(url)
{
  //TODO: Write Code to validateURL
  return "success";
}

exports.downloadVideoFromCommand = function(url,responseObj)
{
  if(!url)
    return "downloadController.js | downloadVideoFromCommand() | empty url ";

  try
  {
    var execSync = require('child_process').execSync;

    var cmd = downloaderConstants.makeDirectoryCommand + downloaderConstants.userFolderName;
    cmd = cmd + ";"+ downloaderConstants.changeDirectoryCommand + downloaderConstants.userFolderName;
    cmd = cmd +";"+downloaderConstants.downloadCommand + url;

    responseObj.sysOut = execSync(cmd);
  } catch (e) {
    return "downloadController.js | downloadVideoFromCommand() | download failed | " + e;
  }
  return "success";
}

exports.isDownloadRequest = function(req){
  if( !req.body.command || downloaderConstants.command != req.body.command.toLowerCase() )
    return "failure";
  else
    return "success";
};
