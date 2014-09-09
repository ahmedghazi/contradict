var ApiController = function(app) {
	var express = require('express');
    this.router = express.Router();
    var mongoose = require('mongoose');
    var ObjectId = mongoose.Schema.ObjectId;
    var Story = app.getModel('Story');
    var Reply = app.getModel('Reply');
    var User = app.getModel('User');
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
    this.router.post('/c', function(req, res){
        var user = new User({
            name: req.body.name,
            email: req.body.email,
        });
        /*
        req.login(user, function(err) {
          if (err) { return next(err); }
          //return res.redirect('/users/' + req.user.username);
          console.log(req.user)
        });
        */
        user.save(function (err) {
            if (!err) {
                return console.log("user created");
            } else {
                return console.log(err);
            }
        });

        //console.log(user);

        var d = new Date();
        var story = new Story({
            title:req.body.title,
            content:req.body.content,
            date: d,
            //creator:user._id,
            author:user._id
        });

        story.save(function (err) {
            if (!err) {
                return console.log("created");
            } else {
                return console.log(err);
            }
        });

        //console.log(story);
        res.redirect('/'+story._id);
        
        return res.render('success', {
            title: app.get('title'),
            contradict: story.title+" Created"
        });
    });

    // FORM UPDATE
    this.router.get('/u/:id', function(req, res, next){
        return Story.findById(req.params.id, function (err, story) {
            if (err) {
                return next(err);
            }
            //console.log(story);
            return res.render('update', {
                title: 'Contracticts',
                story: story
            });
        });
    });

    // UPDATE
    this.router.post('/u', function(req, res, next){
        console.log("params : ",req.body);
        return Story.findById(req.body.id, function (err, story) {
            if (err) {
                return next(err);
            }
            story.title = req.body.title;
            story.content = req.body.content;
            //console.log(story);
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
        //console.log(req.body);
        return Story.findById(req.body.id, function (err, story) {
            if (err) {
                return next(err);
            }

            if (req.user) {
                console.log("logged in")
            } else {
                console.log("not logged in")
            }

            /*
            console.log("story : "+story._id);
            if(req.body.action == "vote_up"){
                //story.vote_up++;
                story.update( { '$inc': { vote_up: 1 } } );
            }else{
                //story.vote_down++;
                story.update( { '$inc': { vote_down: 1 } } );
            }
            */
            /*story.save(function (err) {
                if (!err) {
                    return console.log("updated");
                } else {
                    return console.log(err);
                }
            });*/
            var query = {_id: story._id, voters: {'$ne': req.body.user_id}};
            if(req.body.action == "vote_up")update = {'$push': {'voters': req.body.user_id}, '$inc': {vote_up:1}};
            if(req.body.action == "vote_down")update = {'$push': {'voters': req.body.user_id}, '$inc': {vote_down:1}};
//console.log(query);
//console.log(update);
            story.update(query,update);
console.log(story)
            return res.json(story);
        });

        /*var query = {_id: ObjectId(req.body.id), voters: {'$ne': req.body.user_id}};
            var update;
            if(req.body.action == "vote_up")update = {'$push': {'voters': req.body.user_id}, '$inc': {vote_up:1}};
            if(req.body.action == "vote_down")update = {'$push': {'voters': req.body.user_id}, '$inc': {vote_down:1}};
//console.log(query);
//console.log(update);
            story.update(query, update);

console.log(story);
        return res.send(story);
        */
    });



    // REPLY
    this.router.post('/r', function(req, res){
        var user = new User({
            name: req.body.name,
            email: req.body.email,
        });

        user.save(function (err) {
            if (!err) {
                return console.log("user created");
            } else {
                return console.log(err);
            }
        });

        var d = new Date();
        var reply = new Reply({
            //creator:user._id,
            author: user._id,
            reply_to:req.body.reply_to,
            title:req.body.title,
            content:req.body.content,
            date: d,
        });
//console.log(reply)
        //var user = new User

        reply.save(function (err) {
            if (!err) {
                return console.log("created");
            } else {
                return console.log(err);
            }
        });
        
        res.redirect('/'+req.body.reply_to);
    });

    // VOTE REPLY
    this.router.post('/vr', function(req, res){
        //console.log(req.body);
        return Reply.findById(req.body.id, function (err, reply) {
            if (err) {
                return next(err);
            }
            
            if(req.body.action == "vote_up"){
                reply.vote_up = reply.vote_up + 1;
            }else{
                reply.vote_down = reply.vote_down + 1;
            }

            reply.save(function (err) {
                if (!err) {
                    return console.log("updated");
                } else {
                    return console.log(err);
                }
            });
            return res.send(reply);
        });
        

    });


    return this;
};


module.exports = ApiController;