var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Story = mongoose.Schema({
    creator: {type: String},
    author:{type: Schema.Types.ObjectId, ref: 'User'},
    title: {type: String},
    description: {type: String},
    content: {type: String},
    media: {type: String},
    date: {type: Date, default: Date.now},
    vote_up: {type: Number, default: 0},
    vote_down: {type: Number, default: 0},
    voters: {type:Array}
}, {
    //versionKey: false
});


Story.methods.findCreator = function (callback) {
    //console.log(this.creator)
    return this.db.model('User').findById(this.creator, callback);
};

Story.statics.findByTitle = function (title, callback) {
    return this.find({ title: title }, callback);
};

module.exports = Story;