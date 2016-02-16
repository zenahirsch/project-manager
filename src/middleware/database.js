var mongo = require('mongodb');
var db = require('monk')(process.env.MONGOLAB_URI);

module.exports = function(req, res, next) {
    req.db = db;
    next();
};