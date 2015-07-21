var mongoose = require('mongoose');
var Reply = require('../config/schemas/reply');
module.exports = mongoose.model('Reply', Reply);