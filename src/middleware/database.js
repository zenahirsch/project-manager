var mongo = require('mongodb');
var db = require('monk')('localhost:27017/project-manager');

module.exports = function(req, res, next) {
    req.db = db;
    next();
};