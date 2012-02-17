var Item = require('../models/item.js');

exports.item = function(req,res) {
	new Item({created: req.body.created
		, updated: req.body.updated
		, verb: req.body.verb
		, determinative: req.body.determinative
		, noun: req.body.noun
		, visible: req.body.visible
		, comment: req.body.visible
		}).save();
}

exports.list = function(req, res) {
	Item.find(function(err, items) {
		res.send(items);
	});
};