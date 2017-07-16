'user strict';

var threadConstants = {
  time_sec:1000,
  time_min:60*1000,
  time_hr:60*60*1000,
  time_day:24*60*60*1000
};
var threads = [
  {
      "label":"youtubeDownloaderThread",
      "interval":threadConstants.time_day,
      "metadata":{
        playlistURL:"https://www.youtube.com/playlist?list=PLU5LjflYqkmbqtsvtg3giHfmZkgo2Iqzu"
      },
      "callback":function(threadObj)
      {
        console.log("threadController.js | " + threadObj.label + " API | Downloading youtube playlist");
        var downloadController = require('../controllers/downloadController');
        var responseObj={};
        console.log("threadController.js | " + threadObj.label + " API | Download Response: " + downloadController.downloadVideoFromCommand(threadObj.metadata.playlistURL,responseObj));
        //clearInterval(threadObj.id);
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
