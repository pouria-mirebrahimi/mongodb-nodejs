import { expect } from "chai";
import User from "../src/model/user/user.model.js";

xdescribe("reading users testing", () => {
	let testUser;

	beforeEach((done) => {
		testUser = new User({ name: "pouria" });
		testUser.save().then(() => done());
	});

	it("finds a user", (done) => {
		User.findOne({ name: "pouria" }).then((user) => {
			expect(user.name).equal(testUser.name);
			expect(user._id.toString()).equal(testUser._id.toString());
			done();
		});
	});
});
