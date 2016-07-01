var express = require('express');


var router = express.Router();
var credentials = require('../credentials');

router.get('/accessToken', function(req,res) {
    res.send(credentials.accessToken);
})
// Generate access token
// Your code here
router.use(function(req,res,next) {

    next();
})


module.exports = router;
