import { expect } from "chai";
import User from "../src/model/user/user.model.js";
import BlogPost from "../src/model/post/blog-post.model.js";
import Comment from "../src/model/post/comment.model.js";

describe("association testing", () => {
	let user, blogPost, comment;

	beforeEach((done) => {
		user = new User({ name: "pouria" });
		blogPost = new BlogPost({ title: "title", content: "lorem contents" });
		comment = new Comment({ content: "lorem comment" });
		user.blogPosts.push(blogPost);
		blogPost.comments.push(comment);
		comment.user = user;
		Promise.all([user.save(), blogPost.save(), comment.save()]).then(() => {
			done();
		});
	});

	it("load an user and its blogPost relationship", (done) => {
		User.findOne({ name: "pouria" })
			.populate("blogPosts")
			.then((found) => {
				expect(found.blogPosts.length).to.equal(1);
				expect(found.blogPosts[0].title).to.equal(blogPost.title);
				done();
			});
	});

	it.only("load an user and its full nested relationships", (done) => {
		User.findOne({ name: "pouria" })
			.populate({
				path: "blogPosts",
				populate: {
					path: "comments",
				},
			})
			.then((found) => {
				expect(found.blogPosts.length).to.equal(1);
				expect(found.blogPosts[0].comments.length).to.equal(1);
				expect(found.blogPosts[0].comments[0].content).to.equal(
					comment.content
				);
				done();
			});
	});
});
