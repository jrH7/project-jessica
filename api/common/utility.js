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

exports.constants =
{
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
    "videoDownloadURLValidationFailure":"OOPs! Your url params seem wrong - J"
  }
};
