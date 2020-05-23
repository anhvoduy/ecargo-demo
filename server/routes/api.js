// Dependencies
var express = require('express');
var router = express.Router();

// routers: use for testing
router.get('/', function(req, res){
    res.json({ message: 'eCargo method GET() is success' });
});

// return Router
module.exports = router;
