import mongoose from "mongoose";
import ReviewsSchema from "./reviews-schema.js";

const ReviewsModel = mongoose.model("ReviewsModel", ReviewsSchema);
export default ReviewsModel;