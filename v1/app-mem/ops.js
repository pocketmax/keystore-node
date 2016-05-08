var _ = require('lodash');

var store = {
	mydom: {
		doo: {
			doo: {
				foo: {
					bar: 'the value'
				}
			}
		}
	}
};

module.exports = {

	// create a key and value
	createKey: function (sandbox, keyPath, keyValue, cb) {

		if (_.has(store[sandbox], keyPath)) {
			// error: key already exists, can't overwrite
			cb(true);
		} else {
			_.set(store[sandbox],keyPath, keyValue);
			cb(null, keyValue);
		}

	},
	// fetches the value of a specified key
	getKey: function (sandbox, keyPath, cb) {

		var results = _.get(store[sandbox],keyPath, null);

		if (_.isNull(results)) {
			cb(true);
		} else {
			cb(null, results);
		}

	},
	// upsert value to a key path
	upsertKey: function (sandbox, keyPath, keyValue, cb) {

		_.set(store[sandbox],keyPath, keyValue);

			cb(null, keyValue);

	},

	// delete a key path
	deleteKey: function (sandbox, keyPath, cb) {

		if(_.unset(store[sandbox],keyPath)) {
			cb(null, true);
		} else {
			cb(true);
		}
	}

};