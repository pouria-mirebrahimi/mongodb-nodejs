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
	const { users, comments, blogposts } = mongoose.connection.collections;
	Promise.all([users.drop(), comments.drop(), blogposts.drop()]).then(() => {
		done();
	});
});
