var HomeController = function(app) {
    var express = require('express');
    this.router = express.Router();
    var Story = app.getModel('Story');
    var Reply = app.getModel('Reply');
    var User = app.getModel('User');
    var postsPerPage = 2;


    //Listen for route /
    this.router.get('/', function(req, res) {
        //console.log(db);
        return Story.find().sort({date: 'desc'}).limit(postsPerPage).exec(function(err, stories) {
            if (err) {
                console.log(err);
                return next(err);
            }
            //console.log(app.get('title'));
            return res.render('liste', {
                title: "Home",
                stories: stories
            });
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
                title: "Page "+req.params.page,
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
                title: "Top",
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
                title: "Worst",
                stories: stories
            });
        });
    });

    this.router.get('/:id', function(req, res, next){
        return Story
                .findById(req.params.id)
                .populate('author')
                .exec(function(err, story) {
                //, function (err, story) {
            if (err) {
                return next(err);
            }
            
            console.log(story)
            
            var replies = Reply
                .find({reply_to:req.params.id})
                .sort({vote_up: 'desc'})
                .populate('author')
                .exec(function(err, replies) {
                    //console.log(replies)
                    return res.render('story', {
                        title: story.title,
                        story: story,
                        replies: replies,
                    });

            });

        });
    });

    

    return this;
};

module.exports = HomeController;