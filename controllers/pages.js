var PagesController = function(app) {
    var express = require('express');
    this.router = express.Router();
    //var media_parser = require('media-parser');
    var oembed = require('oembed');
    var Story = app.getModel('Story');
    var Reply = app.getModel('Reply');
    var User = app.getModel('User');
    var postsPerPage = 200;

    var Session = require('../config/security/session')();

    //Listen for route /
    this.router.get('/', function(req, res) {
        //console.log(Session.MemoryStore);
        return Story.find().sort({date: 'desc'}).limit(postsPerPage).exec(function(err, stories) {
            if (err) {
                console.log(err);
                return next(err);
            }
            //console.log(app.get('title'));
            return res.render('liste', {
                title: app.get('title'),
                stories: stories
            });
        });
    });

    this.router.get('/:id', function(req, res, next){
        console.log(req.session);
        var populateQuery = [{path:'media'}, {path:'user'}];

        return Story
            .findById(req.params.id)
            .populate(populateQuery)
            .exec(function(err, story) {
                if (err) {
                    return next(err);
                }
                
                var ppopulateQuery = [{path:'media'}, {path:'user'}];
                var replies = Reply
                    .find({reply_to:req.params.id})
                    .sort({vote_up: 'desc'})
                    .populate(ppopulateQuery)
                    .exec(function(err, replies) {
                        console.log(replies);
                        return res.render('story', {
                            title: app.get('title'),
                            story: story,
                            //media: media,
                            replies: replies,
                        });
                });
        });
    });

    this.router.get('/contact', function(req, res) {
        return res.render('contact', {
            title: app.get('title')
        });
    });

    this.router.get('/legal', function(req, res) {
        return res.render('legal', {
            title: app.get('title')
        });
    });


     //Listen for route /
    this.router.get('/p/:page', function(req, res) {
        //console.log(db);
        return Story
                .find()
                .sort({date: 'desc'})
                .limit(postsPerPage)
                .skip(req.params.page)
                .exec(function(err, stories) {
            if (err) {
                console.log(err);
                return next(err);
            }
            
            return res.render('liste', {
                title: app.get('title'),
                stories: stories
            });
        });
    });

    this.router.get('/up', function(req, res) {
        return Story.find().sort({vote_up: 'desc'}).exec(function(err, stories) {
            if (err) {
                console.log(err);
                return next(err);
            }
            
            return res.render('liste', {
                title: app.get('title'),
                stories: stories
            });
        });
    });

    this.router.get('/down', function(req, res) {
        return Story.find().sort({vote_down: 'desc'}).exec(function(err, stories) {
            if (err) {
                //console.log(err);
                return next(err);
            }
            
            return res.render('liste', {
                title: app.get('title'),
                stories: stories
            });
        });
    });

    

    

    return this;
};

module.exports = PagesController;