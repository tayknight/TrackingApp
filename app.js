
/**
 * Module dependencies.
 */

//var routes = require('./routes');
var mongoose = require('mongoose');
var models = require('./models/model.js');
var Item = mongoose.model('Item');
var express = require('express');

var app = module.exports = express.createServer();
console.log(Item);

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(require('stylus').middleware({ src: __dirname + '/public' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

app.get('/', function(req, res) {
	Item.find({}, function(err, documents) {
        if (!err) {
		res.render('index.jade', {
			locals: {title: 'Items', items: documents}
				});
        }
        else { throw err; }
		});

});

app.post('/Send', function(req,res) {
	var i = new Item(req.body.i);
	i.save(function() {
		res.redirect('/');
	});
});

//app.listen(3000);
app.listen(process.env.PORT);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
