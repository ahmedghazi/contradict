var mongoose = require('mongoose');
var Media = require('../config/schemas/media');
module.exports = mongoose.model('Media', Media);