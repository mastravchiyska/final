var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    req.session.destroy();
    res.json({status: 1});
});

module.exports = router;