var ApiController = function(app) {
	var express = require('express');
    this.router = express.Router();
    var mongoose = require('mongoose');
    var ObjectId = mongoose.Schema.ObjectId;
    var Story = app.getModel('Story');
    var Reply = app.getModel('Reply');
    var User = app.getModel('User');
    var Media = app.getModel('Media');
    //var Helpers = require('helpers');
    var media_parser = require('media-parser');

    //var mongoose = require('mongoose');
    //var Item = mongoose.model('Item', ItemSchema);


    // Routes

    // FORM POST    
    this.router.get('/c', function(req, res){
        return res.render('create', {
            title: app.get('title'),
            description: "Create"
        });
    });



    // CREATE
    this.router.post('/c', function(req, res, next){
        var ip = (req.headers['x-forwarded-for'] || '').split(',')[0] || req.connection.remoteAddress;
        var user = new User({
            name:req.body.name, 
            email:req.body.email,
            ip: ip
        });

        user.save(function (err) {
            var user_exists = false;
            if (err) {
                if (err.code != 11000) {
                    return next(err);
                }else{
                    user_exists = true;
                }
            }
//console.log(req.body.media)
            if (user_exists) {
                User.findOne( { email: req.body.email }, function(err, uuser){

                    var story = new Story({
                        title:req.body.title,
                        content:req.body.content,
                        media:req.body.media,
                        date: new Date(),
                        user: uuser._id,
                        voters:[uuser._id],
                    });

                    story.save(function (err) {
                        if (!err) {

                            if(req.body.media){
                                media_parser.parse(req.body.media, function(obj) { 
                                    console.log(obj);
                                    var media = new Media({
                                        title: obj.title,
                                        raw: JSON.stringify(obj.raw),
                                        url: req.body.media
                                    });

                                    media.save(function (err) {
                                        console.log(media);
                                        story.media = media._id;
                                        story.save();
                                    });
                                });
                            }

                            return console.log("created && user_exists : "+user_exists);
                        } else {
                            return console.log(err);
                        }
                    });

                    //res.redirect('/'+story._id);
                } );
            }else{
                var story = new Story({
                    title:req.body.title,
                    content:req.body.content,
                    media:req.body.media,
                    date: new Date(),
                    user:user._id,
                    voters:[user._id]
                });

                story.save(function (err) {
                    if (!err) {

                        return console.log("created && user_exists : "+user_exists);
                    } else {
                        return console.log(err);
                    }
                });
                
                res.redirect('/'+story._id);
            }
        });

    }, function(err, req, res, next){
            console.log("/c middleware");
            console.log(err);
    });

    

    // GET FORM UPDATE
    this.router.get('/u/:id', function(req, res, next){
        //return Story.findById(req.params.id).populate('user').exec(function(err, story) {
        return Story.findById(req.params.id).populate('user').exec(function(err, story) {
            if (err) {
                return next(err);
            }

            return res.render('update', {
                title: app.get('title'),
                story: story
            });
        });
    });

    // POST UPDATE
    this.router.post('/u/:id', function(req, res, next){
        //console.log("params : ",req.body);
        return Story.findById(req.body.id, function (err, story) {
            if (err) {
                return next(err);
            }
//console.log(Helpers)
            story.title = req.body.title;
            story.content = req.body.content;
            story.media = req.body.media;

            story.save(function (err) {
                if (!err) {
                    return console.log("updated");
                } else {
                    return console.log(err);
                }
            });

            res.redirect('/'+req.body.id);
            
        });
    });

    
    // DELETE
    this.router.get('/d/:id', function(req, res, next){
        return Story.findById(req.params.id, function (err, story) {
            if (err) {
                return next(err);
            }
            //console.log(story);
            story.remove(function (err) {
                if (!err) {
                    return console.log("deleted");
                } else {
                    return console.log(err);
                }
            });

            /*return res.render('success', {
                title: app.get('title'),
                contradict: story.title+" Deleted"
            });*/
            res.redirect('/');
        });
    });
   

    // VOTE STORY
    this.router.post('/v', function(req, res){
console.log(req.session.user);
        if(req.session.user) {
            var query = { _id: req.body.id, user: { $ne: ObjectId(req.session.user._id) }, voters: { $nin: [ req.session.user._id ] } };
            if(req.body.action == "vote_up")update = {$push: {'voters': req.session.user._id}, $inc: {vote_up:1}};
            if(req.body.action == "vote_down")update = {$push: {'voters': req.session.user._id}, $inc: {vote_down:1}};
        }else{
            var ip = (req.headers['x-forwarded-for'] || '').split(',')[0] || req.connection.remoteAddress;

            var query = { _id: req.body.id, voters: { $nin: [ ip ] } };
            if(req.body.action == "vote_up")update = {$push: {'voters': ip}, $inc: {vote_up:1}};
            if(req.body.action == "vote_down")update = {$push: {'voters': ip}, $inc: {vote_down:1}};
        }

        Story.findOneAndUpdate(query, update, {}, function (err, story, raw) {
            if (!err) {
                return res.send(story);
            } else {
                return console.log(err);
            }

        });

    });



    // REPLY
    this.router.post('/r', function(req, res){
        var ip = (req.headers['x-forwarded-for'] || '').split(',')[0] || req.connection.remoteAddress;
        var user = new User({
            name: req.body.name,
            email: req.body.email,
            ip: ip
        });

        user.save(function (err) {
            var user_exists = false;
            if (err) {
                if (err.code != 11000) {
                    //return next(err);
                    console.log(err);
                }else{
                    user_exists = true;
                }
            }

            if (user_exists) {
                User.findOne( { email: req.body.email }, function(err, uuser){
                
                    var reply = new Reply({
                        user: uuser._id,
                        reply_to:req.body.reply_to,
                        title:req.body.title,
                        content:req.body.content,
                        date: new Date(),
                    });

                    reply.save(function (err) {
                        if (!err) {
                            //sess.user = uuser;
                            return console.log("reply created && user_exists : "+user_exists);
                        } else {
                            return console.log(err);
                        }
                    });

                    res.redirect('/'+req.body.reply_to);
                } );
            }else{
                var reply = new Reply({
                    user: user._id,
                    reply_to:req.body.reply_to,
                    title:req.body.title,
                    content:req.body.content,
                    date: new Date(),
                });

                reply.save(function (err) {
                    if (!err) {
                        //sess.user = user;
                        return console.log("reply created && user_exists : "+user_exists);
                    } else {
                        return console.log(err);
                    }
                });
                
                res.redirect('/'+req.body.reply_to);
            }
        });

    });

    // VOTE REPLY
    this.router.post('/vr', function(req, res){
        console.log(req.session.user)
        if(req.session.user) {
            var query = { _id: req.body.id, voters: { $nin: [ req.session.user._id ] } };
            if(req.body.action == "vote_up")update = {$push: {'voters': req.session.user._id}, $inc: {vote_up:1}};
            if(req.body.action == "vote_down")update = {$push: {'voters': req.session.user._id}, $inc: {vote_down:1}};
        }else{
            var ip = (req.headers['x-forwarded-for'] || '').split(',')[0] || req.connection.remoteAddress;

            //var query = { _id: req.body.id, voters: { $nin: [ ip ] } };
            var query = { _id: req.body.id };
            if(req.body.action == "vote_up")update = {$push: {'voters': ip}, $inc: {vote_up:1}};
            if(req.body.action == "vote_down")update = {$push: {'voters': ip}, $inc: {vote_down:1}};
        }

        Reply.findOneAndUpdate(query, update, {}, function (err, story, raw) {
            if (!err) {
                return res.send(story);
            } else {
                return console.log(err);
            }

        });

    });


    return this;
};


module.exports = ApiController;