var SecurityController = function(app) {
    var express = require('express');
    var passport = require('passport');
    this.router = express.Router();
    var User = app.getModel('User');
    /*
     * Login Check Path
     * reutrn the login form as view
     */
    this.router.post('/login', function(req, res, next) {
        passport.authenticate('local', function(err, user, info) {
            req.flash('email', req.body.email);
            //console.log(user);
            //console.log(info);
            if (err) {
                req.flash('errors', err);
                return res.redirect('/security/login');
            }
            if (!user) {
                req.flash('errors', info);
                return res.redirect('/security/login');
            }

            //login the user
            req.logIn(user, function(err) {
                if (err)
                    return next(err);
                res.redirect('/');
            });

        })(req, res, next);
    });

    /*
     * Login Path
     * return the login form as view
     */
    this.router.get('/login', function(req, res) {
        var errors = req.flash('errors');
        var email = req.flash('email');
        return res.render('security/login', {
            title: 'Login',
            errors: errors,
            email: email
        });
    });

    /*
     * Logout Path
     */
    this.router.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/security/login');
    });


    /*
     * Login Path
     * return the login form as view
     */
    this.router.get('/register', function(req, res) {
        return res.render('security/register', {
            title: 'Register'
        });
    });

    this.router.post('/register', function(req, res, next) {
        var user = new User({
            email: req.body.email,
            password: req.body.password
        });

        user.save(function (err) {
            if (!err) {
                //return console.log("user created");
                res.redirect('/security/login');
            } else {
                return console.log(err);
            }
        });
    });



    this.router.get('/', function(req, res) {
        return User.find().exec(function(err, users) {
            if (err) {
                console.log(err);
                return next(err);
            }
            return res.json(users);
        });
    });

    
    return this;
};

module.exports = SecurityController;