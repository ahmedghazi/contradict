var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Story = mongoose.Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    media: {type: Schema.Types.ObjectId, ref: 'Media'},
    title: {type: String},
    description: {type: String},
    content: {type: String},
    date: {type: Date, default: Date.now},
    vote_up: {type: Number, default: 0},
    vote_down: {type: Number, default: 0},
    voters: {type:Array}
}, {
    //versionKey: false
});


Story.methods.findUser = function (callback) {
    return this.db.model('User').findById(this.user, callback);
};

Story.statics.findByTitle = function (title, callback) {
    return this.find({ title: title }, callback);
};

module.exports = Story;