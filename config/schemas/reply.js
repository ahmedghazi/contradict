var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Reply = mongoose.Schema({
	creator: {type: String},
	author:{type: Schema.Types.ObjectId, ref: 'User'},
    reply_to:{type: String},
    title: {type: String},
    description: {type: String},
    content: {type: String},
    date: {type: Date, default: Date.now},
    vote_up: {type: Number,default: 0},
    vote_down: {type: Number,default: 0},
    voters: {type:Array}
}, {
    //versionKey: false
});

Reply.methods.findCreator = function (callback) {
  return this.db.model('User').findById(this.creator, callback);
};

Reply.statics.findByTitle = function (title, callback) {
  return this.find({ title: title }, callback);
};

module.exports = Reply;