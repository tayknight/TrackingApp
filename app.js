
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , mongoose = require('mongoose')
  , models = require('./models/model.js')
  , moment = require('moment')
  , Item;
  
var app = module.exports = express.createServer();

// connect to Mongo when the app initializes
mongoose.connect('mongodb://localhost/mydb');

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

models.defineModels(mongoose, function() {
	app.Item = Item = mongoose.model('Item');	
});

app.get('/', function(req, res) {
	Item.find({}, function(err, documents) {
		res.render('index.jade', {
			locals: {title: 'Items', items: documents}
				});
		});
});

app.post('/', function(req,res) {
	var i = new Item(req.body.i);
	i.save(function() {
		//req.flash('info', 'Item created');
		res.redirect('/');
	});
});

//app.listen(3000);
app.listen(process.env.PORT);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
