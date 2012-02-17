var Item;

function defineModels(mongoose, fn) {
	var Schema = mongoose.Schema
	, ObjectId = Schema.ObjectId;
	
	Item = new Schema({
		item: ObjectId
		, created: { type: Date, default: Date.now }
		, updated: { type: Date, default: Date.now }
		, verb: String
		, determinative: String
		, noun: String
		, visible: Boolean
		, comment: String	
	});
	
	Item.virtual('id')
		.get(function() {
			return this._id.toHexString();
	});
	
	mongoose.model('Item', Item);
	
	fn();
	
}

exports.defineModels = defineModels;