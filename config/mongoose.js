//Require the Mongoose Library
const mongoose = require("mongoose");
//Require the Environment File for getting the Environment Variables
const env = require("./environment");

let db;
function connectDb() {
	mongoose.connect("mongodb+srv://shudhanshuarya111:Five55555@cluster0.k50od.mongodb.net/mydatabase?retryWrites=true&w=majority")
	.then(()=> {
		console.log("Db connected successfully!");
	})
	.catch(error => {
		console.log(error);
	})
}

//If the Environment is Development
const Development = async () => {
	try {
		//Connect to the Database
		mongoose.connect('mongodb+srv://shudhanshuarya111:Five55555@cluster0.k50od.mongodb.net/mydatabase?retryWrites=true&w=majority');

		//Acquire the Connection
		db = mongoose.connection;
		//If Error
		db.on("error", console.error.bind(console, "Connection Error"));
		//If Successful
		db.once("open", () => {
			console.log("Connected to MongoDB Successfully");
		});
	} catch (error) {
		//If Error
		console.log("Error==>", error);
	}
};

//If the Environment is Production
const Production = async () => {
	try {
		const options = { useNewUrlParser: true, useUnifiedTopology: true };
		//Connect to the Database
		await mongoose.connect('mongodb://shudhanshuarya111:Five55555@cluster0.k50od.mongodb.net/mydatabase?retryWrites=true&w=majority');

		//Acquire the Connection
		db = mongoose.connection;
		//If Successful
		console.log("Connected to MongoDB Successfully");
	} catch (error) {
		//If Error
		console.log(error);
	}
};

//Establishes the Connection based on the Environment
const EstablishConnection = async () => {
	try {
		if (env.name === "development" && env.deployment === "local") {
			await Development();
		} else if (env.name === "production" && env.deployment === "local") {
			await Development();
		} else if (env.name === "production" && env.deployment === "AWS") {
			await Development();
		} else if (env.name === "production" && env.deployment === "Heroku") {
			await Production();
		} else if (env.name === "production" && env.deployment === "other") {
			await Production();
		}
		if (!db) console.log("Connection Error");
	} catch (error) {
		console.log(error);
	}
};

EstablishConnection();

//Export the Connection
module.exports = connectDb;
