var db = require('../config/db.js');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var Item = new Schema({
    item: ObjectId,
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
    verb: String,
    determinative: String,
    noun: String,
    visible: Boolean,
    comment: String
});

mongoose.connect('mongodb://' + db.user + ':' + db.pass + '@' + db.host + ':' + db.port + '/' + db.name);
mongoose.model('Item', Item);