import mongoose from "mongoose";

const ReviewsSchema = new mongoose.Schema({
    username: String, // user's username
    date: Object, // user's date of posting, properties - Month, Day, Year, 24-Hour, Minute
    movie: String, // movie id
    rating: Number, // sliding scale
    likes: Number,
    liked: Boolean,
    dislikes: Number,
    disliked: Boolean,
    adminPicked: Boolean, // picked by admin to show on home page
    review: String // review content
                                          }, {collection: "reviews"});

export default ReviewsSchema;