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

	it.only("create associated user, blogPost, and comment", (done) => {
		User.findOne({ name: "pouria" })
			.populate("blogPosts")
			.then((found) => {
				expect(found.blogPosts.length).to.equal(1);
				expect(found.blogPosts[0].title).to.equal(blogPost.title);
				done();
			});
	});
});
