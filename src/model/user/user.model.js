import mongoose from "mongoose";
import { PostSchema } from "../post/post.model.js";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
	name: {
		type: String,
		required: [true, "Name is required."],
		validate: {
			validator: (name) => name.length > 2,
			message: "Name length must be greater than 2.",
		},
	},

	posts: [PostSchema],
});

UserSchema.virtual("postCount").get(function () {
	return this.posts.length;
});

const User = mongoose.model("user", UserSchema);
export default User;
