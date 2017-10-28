var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    var db = req.db;
    var collection = db.get('users');
    collection.find({}, {}, function(err, docs) {
        res.json(docs);
    });
});

router.post('/', function (req, res, next) {
    var collection = db.get('users');
    var newUser = req.body;
    collection.insert(newUser, function(err, result) {
        res.json(result);
    });
});
module.exports = router;
