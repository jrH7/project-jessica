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
        console.log("utility.js | sendResponseToRedirectURL() | client didn't acknowledged the message");
      }
  })
}
