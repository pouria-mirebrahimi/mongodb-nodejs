import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PostSchema = new Schema({
	title: {
		type: String,
		validate: {
			validator: (title) => title.length > 2,
			message: "Post title must be greater than 2.",
		},
	},
});

const Post = mongoose.model("post", PostSchema);
export { Post, PostSchema };
