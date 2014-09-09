var mongoose = require('mongoose');
var Story = require('../config/schemas/story');
module.exports = mongoose.model('Story', Story);