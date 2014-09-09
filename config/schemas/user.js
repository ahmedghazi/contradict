var mongoose = require('mongoose');
//var forms = require('forms');

var User = mongoose.Schema({
	name: {type: String, required: true},
    password: {type: String},
    email: {type: String, required: true, index: { unique: true, sparse: true }}
}, {
    //versionKey: false
});
module.exports = User;