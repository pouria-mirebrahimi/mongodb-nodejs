import { assert, expect } from "chai";
import User from "../src/model/user/user.model.js";

describe("creating users testing", () => {
	it("saves a user", (done) => {
		const user = new User({ name: "user one" });
		user.save().then(() => {
			assert.isFalse(user.isNew);
			done();
		});
	});

	it("saves a user with a null name", () => {
		const user = new User({ name: undefined });
		const validationResult = user.validateSync();
		expect(validationResult.errors.name.message).to.equal("Name is required.");
	});

	it("saves a user with a short length name", () => {
		const user = new User({ name: "AB" });
		const validationResult = user.validateSync();
		expect(validationResult.errors.name.message).to.equal(
			"Name length must be greater than 2."
		);
	});

	it("disallowing a user to be saved", (done) => {
		const user = new User({ name: "AB" });
		user.save().catch((validationResult) => {
			const { message } = validationResult.errors.name;
			expect(message).to.equal("Name length must be greater than 2.");
			done();
		});
	});
});
