/**
 * This is an Express app instance, extended by express rapido
 * @type ExpressRapido
 */
var app = require('./config/expressRapido.js')();

app.set('title', 'Contradict/Me - VOX POPULI');
app.set('appDbName', 'contradict');

//boot the app
app.boot();



//register some models
app.registerModel('User', 'user');
//app.registerModel('Option', 'option');
app.registerModel('Story', 'story');
app.registerModel('Reply', 'reply');

//register some controllers
app.registerController('request');
app.registerController('security');
app.registerController('home');
app.registerController('api');
app.registerController('error404');
app.registerController('error');

//register some route
app.registerRouteConfig('', app.getController('request'));
app.registerRouteConfig('/security', app.getController('security').router);
app.registerRouteConfig('/', app.getController('home').router);
app.registerRouteConfig('/api', app.getController('api').router);
//app.registerRouteConfig('/', app.getController('contradict').router);
app.registerRouteConfig('', app.getController('error404').router);
app.registerRouteConfig('', app.getController('error'));


module.exports = app;
