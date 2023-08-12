import { assert } from "chai";
import User from "../src/model/user/user.model.js";

xdescribe("removing users testing", () => {
	let testUser;

	beforeEach((done) => {
		testUser = new User({ name: "pouria" });
		testUser.save().then(() => done());
	});

	it("delete a user using class model", (done) => {
		User.findOneAndRemove({ name: testUser.name })
			.then(() => User.findOne({ name: testUser.name }))
			.then((user) => {
				assert.isNull(user);
				done();
			});
	});
});
