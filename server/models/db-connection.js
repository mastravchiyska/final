var monk = require('monk');
var db = monk('localhost:27017/facebook');

function DbConnect() {
    return db;
}

module.exports = DbConnect;