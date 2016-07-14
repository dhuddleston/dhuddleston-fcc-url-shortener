var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var shortUrlSchema = new Schema({
   originalUrl: String,
   shortenedUrl: String
});

module.exports = mongoose.model('ShortUrl', shortUrlSchema);