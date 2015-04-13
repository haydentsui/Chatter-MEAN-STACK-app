module.exports = require('./env/' + process.env.NODE_ENV + '.js');
var uri = 'mongodb://localhost/mean-book';
var db = require('mongoose').connect(uri);