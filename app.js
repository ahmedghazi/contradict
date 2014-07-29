
/**
 * This is an Express app instance, extended by express rapido
 * @type ExpressRapido
 */
var app = require('./config/expressRapido.js')();

//boot the app
app.boot();

//register some models
app.registerModel('User', 'user');
app.registerModel('Option', 'option');

//register some controllers
app.registerController('request');
app.registerController('security');
app.registerController('home');
app.registerController('error404');
app.registerController('error');

//register some route
app.registerRouteConfig('', app.getController('request'));
app.registerRouteConfig('/security', app.getController('security').router);
app.registerRouteConfig('/', app.getController('home').router);
app.registerRouteConfig('', app.getController('error404').router);
app.registerRouteConfig('', app.getController('error'));

module.exports = app;
