import mongoose from "mongoose";

before((done) => {
	mongoose.connect("mongodb://localhost/db-mongodb-tests");
	mongoose.connection
		.once("open", () => {
			console.log("connection established");
			done();
		})
		.on("error", (error) => console.error(error));
});

beforeEach((done) => {
	mongoose.connection.collections.users.drop(() => done());
});

after((done) => {
	mongoose.connection.collections.users.drop(() => done());
});
