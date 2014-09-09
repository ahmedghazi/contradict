var mongoose = require('mongoose');
var Reply = require('../config/schemas/Reply');
module.exports = mongoose.model('Reply', Reply);