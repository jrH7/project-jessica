'user strict';

var commonUtility = require('../common/utility');

var threads = [
  {
      "label":"youtubeDownloaderThread",
      "interval":commonUtility.constants.time.time_day,
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

exports.initialize = function(){
  console.log("threadController.js | initialize() | Starting threads");
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
}//end of initialize
