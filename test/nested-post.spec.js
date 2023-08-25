import { assert, expect } from "chai";
import User from "../src/model/user/user.model.js";

xdescribe("nested documents testing", () => {
	it("create user with nested posts", (done) => {
		const user = new User({
			name: "pouria",
			posts: [{ title: "post title" }],
		});

		user
			.save()
			.then(() => User.findOne({ name: "pouria" }))
			.then((user) => {
				expect(user.posts.length).to.equal(1);
				done();
			});
	});

	it("push posts into a created user", (done) => {
		const user = new User({ name: "pouria", posts: [] });

		user
			.save()
			.then(() => User.findOne({ name: "pouria" }))
			.then((user) => {
				user.posts.push({ title: "title 1" });
				return user.save();
			})
			.then(() => User.findOne({ name: "pouria" }))
			.then((user) => {
				expect(user.posts[0].title).to.equal("title 1");
				done();
			});
	});

	it("push posts into a created user", (done) => {
		const user = new User({ name: "pouria", posts: [{ title: "title 1" }] });

		user
			.save()
			.then(() => User.findOne({ name: "pouria" }))
			.then((user) => {
				expect(user.postCount).to.equal(1);
				done();
			});
	});
});
