'user strict';

var commonUtility = require('../common/utility');
var stringFormat = require('string-format');

var threads = [
  {
      "label":"youtubeDownloaderThread",
      "alias":"ytd",
      "interval":commonUtility.constants.time.time_hr,
      "metadata":{},
      "callback":function(threadObj)
      {
        var downloadController = require('../controllers/downloadController');

        console.log("threadController.js | " + threadObj.label + " API | Downloading youtube playlist");
        var responseObj={};
        console.log("threadController.js | " + threadObj.label + " API | Download Response: " + downloadController.downloadVideoFromCommand(commonUtility.constants.urls.youtubePlaylistURL,responseObj));
        //clearInterval(threadObj.id);
        commonUtility.sendResponseToRedirectURL(commonUtility.constants.urls.slackWebHookURL,commonUtility.constants.slackMessages.playlistDownloadComplete);
      }
  }
  ,{}
];

exports.controllerID = 0;
exports.initialize = function(id){
  console.log("threadController.js | initialize() | Starting threads");
  controllerID = id;
  for( var i = 0 ; i < threads.length ;i++)
  {
    if( threads[i] && threads[i].callback )
    {
      //Lets call the threads once
      threads[i].callback(threads[i]);
      var id = setInterval(threads[i].callback, threads[i].interval,threads[i]);
      threads[i].id = id;//Storing the ID back
    }
  }
  return "success"
}//end of initialize

exports.kill = function(req,res){
  var status = validateKillCommand(req);
  if("success" == status){
    console.log("threadController.js | kill() | Inside kill command. ");
    threadAlias = req.body.text;
    commonUtility.sendResponseToRedirectURL(req.body.response_url,stringFormat(commonUtility.constants.slackMessages.threadKillDone,req.body.text));
  }
  else {
    console.log("threadController.js | kill() | jessica failed to validate /kill command | " + status);;
    if(commonUtility.validateURL(req.body.response_url) && validateURL(req.body.text))
      commonUtility.sendResponseToRedirectURL(req.body.response_url,stringFormat(commonUtility.constants.slackMessages.videoDownloadURLValidationFailure,req.body.text));
  }
  return;

  //Find thread
  for( var i = 0 ; i < threads.length ;i++)
  {
    if( threads[i] && threads[i].callback )
    {
      //Lets call the threads once
      //threads[i].callback(threads[i]);
      var id = setInterval(threads[i].callback, threads[i].interval,threads[i]);
      threads[i].id = id;//Storing the ID back
    }
  }
  //Kill Thread
}

function validateKillCommand(req)
{
  var status = commonUtility.validateRequest(req);
  if( status != "success" )
  {
    return status;
  }

  if( !req.body.text )
  {
    return "Invalid alias";
  }

  status  = commonUtility.validateURL(req.body.response_url);
  if( !req.body.response_url || status != "success")
  {
    return "Invalid URL";
  }
  return "success";

}
