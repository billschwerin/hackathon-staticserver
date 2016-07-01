var baseUrl = 'https://developer.api.autodesk.com';
var version = 'v1';
var request = require('request');

var authenticateBaseUrl =  baseUrl + '/authentication/' + version;
var callbackUrl = 'https://slickhackathonui.herokuapp.com/callbackUrl';

var credentials = {
    clientId: process.env.CONSUMER_KEY || 'NFlXyNh6eTxNga3muKVkGcVeAlpuOAuy',
    clientSecret: process.env.CONSUMER_SECRET || 'bjMNdkGSAXfjPY9g',
   scope: "data:read data:write data:create data:search bucket:create bucket:read bucket:update bucket:delete code:all account:read account:write user-profile:read",

    authenticationUrl: authenticateBaseUrl + '/authenticate',
    getTokenUrl: authenticateBaseUrl + '/gettoken',
};

credentials.requestAccessToken = function(url, grantType, scope, code, cb) {
   var headers = {
       'Content-Type': 'application/x-www-form-urlencoded'
   };

    var form = {
        client_id : credentials.clientId,
       client_secret : credentials.clientSecret,
       grant_type : grantType,
       scope: scope,
        code: code,
        redirect_uri: callbackUrl
    };

    var settings = {
        url: url,
        method: 'POST',
        headers: headers,
        json : true,
        form : form,
    };

    request(settings, function(error, response, body) {
       var tokenType = body.token_type;
       var expiresIn = body.expires_in;
       var accessToken = body.access_token;
       console.log("Access Token: " + accessToken);
        cb(accessToken);        
    });
};

credentials.twoLeggedAuth = function(cb) {
    return credentials.requestAccessToken(credentials.authenticationUrl, 'client_credentials', credentials.scope, null, cb);
};

credentials.threeLeggedAuth = function(code, cb) {
    return credentials.requestAccessToken(credentials.getTokenUrl, 'authorization_code', null, code, cb);
};

credentials.twoLeggedAuth(function(accessToken) {
    credentials.twoLeggedToken = accessToken;
    credentials.accessToken = accessToken;
});

module.exports = credentials;