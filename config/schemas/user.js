var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = mongoose.Schema({
	name: {type: String, required: true},
    email: {type: String, required: true, index: { unique: true, sparse: true }},
    ip: {type: String, required:true}
}, {
    //versionKey: false
});

User.statics.findByEmail = function (email, callback) {
    return this.find({ email: email }, callback);
};

module.exports = User;

