exports.sendResponseToRedirectURL = function(url,message)
{
  console.log("utility.js | sendResponseToRedirectURL() | jessica replying with message: \""+message+"\"");
  var request = require('request');
  // Set the headers
  var headers = {
      'Content-Type':'application/json'
  }

  // Configure the request
  var options = {
      url: url,
      method: 'POST',
      headers: headers,
      body: "{\"text\":\""+message+"\"}"
  }

  // Start the request
  request(options, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log("utility.js | sendResponseToRedirectURL() | client acknowledged the message");
      }
      else {
        console.log(response.statusCode);
        console.log("utility.js | sendResponseToRedirectURL() | client didn't acknowledged the message");
      }
  })
}

exports.validateRequest = function(req)
{
  if( !req.body.token || exports.constants.token != req.body.token )
  {
    return "Invalid token";
  }
  if( !req.body.user_name|| exports.constants.user_names.indexOf(req.body.user_name.toLowerCase()) == -1 )
  {
    return "Invalid userName";
  }
  return "success"
}


exports.validateURL = function(url)
{
  //TODO: Write Code to validateURL
  return "success";
}
exports.constants =
{
  "token": "guk3piUy7vNFuFNxEucxUC8j",
  "user_names": ['sanchithanda'],

  "urls":
  {
    "slackWebHookURL":"https://hooks.slack.com/services/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",
    "youtubePlaylistURL":"https://www.youtube.com/playlist?list=PLU5LjflYqkmbqtsvtg3giHfmZkgo2Iqzu"
  },
  "time":
  {
    time_sec:1000,
    time_min:60*1000,
    time_hr:60*60*1000,
    time_day:24*60*60*1000
  },
  "slackMessages":
  {
    "playlistDownloadComplete": "I have downloaded your playlist. Enjoy :D - J",
    "videoDownloadComplete": "Your ({}) has been downloaded! - J",
    "videoDownloadFailed": "OOPs! Something went wrong in download of ({}) - J",
    "videoDownloadURLValidationFailure":"OOPs! Your url params seem wrong - J",
    "threadKillDone":"({}) has been terminated! - J"
  },
  "controllers":
  [
    {
     id:"downloadController",
     //REQUEST PARAMS
     commands:['/download'],

     //Internal Commands
     makeDirectoryCommand:'mkdir -p ~/Desktop/Songs/',
     changeDirectoryCommand:'cd ~/Desktop/Songs/',
     userFolderName:'sanchit',
     downloadCommand:'youtube-dl --download-archive -----ARCHIVE------.txt --no-post-overwrites -ciwx --audio-format mp3 -o "%(title)s.%(ext)s" '
   },
   {
     id:"threadController",
     //REQUEST PARAMS
     commands:['/kill']
   }
  ]
};
