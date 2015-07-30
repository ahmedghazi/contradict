var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Media = mongoose.Schema({
    title: {type: String},
    raw: {type: String},
    url: {type: String},
    content: {type: String},
    thumbnail: {type: String},
    date: {type: Date, default: Date.now}
}, {
    //versionKey: false
});

module.exports = Media;