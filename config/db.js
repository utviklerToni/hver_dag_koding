const mongoose = require('mongoose');
const config = require('config');

// .get() allows to get any values from the default.json file
const db = config.get('mongoURI');

const connedDatabse = async () => {
	try {
		await mongoose.connect(db, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false,
		});
		console.log('mongodb connection established');
	} catch (err) {
		console.log(err.message);

		// this exit process with failure
		process.exit(1);
	}
};

module.exports = connedDatabse;
