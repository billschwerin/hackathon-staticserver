 var api = require('./routes/api');
 var express = require('express');
 var credentials = require('./credentials');
 var bodyParser = require('body-parser');


var app = express();

 app.set('port', process.env.PORT || 8000);

 app.use('/', express.static(__dirname + '/www'));

 app.use(bodyParser.json()); // support json encoded bodies
 app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


// // Use this route for proxying access token requests
app.use('/api', api);
app.get('/authcallback', function(req, res) {
  var code = req.query.code;
  credentials.threeLeggedAuth(code, function(accessToken) {
      credentials.threeLeggedToken = accessToken;
      credentials.accessToken = accessToken;
      console.log("3 legged token: " + accessToken);
      res.redirect('/index.html');  
  });

   console.log("Code: " + code);

 })

 app.post('/', function(req, res){
     console.log(req.body);
         var headers = {
        "Content-Type" : "application/json"
    };
    
    var dataAsJson = JSON.stringify(req.body); 
    var ajaxSettings = {
        url: "https://slickhackathon.herokuapp.com",
        method: "POST",
        headers: headers,
        data: dataAsJson
    };

    $.ajax(ajaxSettings);
    
 })

 var server = app.listen(app.get('port'), function() {
     console.log('Server listening on port ' + server.address().port);
 });
