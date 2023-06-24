import ReviewsModel from "./reviews-model.js";

export const findReviews = () => ReviewsModel.find();
export const createReview = (tuit) => ReviewsModel.create(tuit);
export const deleteReview = (tid) => ReviewsModel.deleteOne({_id: tid});
export const updateReview = (tid, tuit) => ReviewsModel.updateOne({_id: tid}, {$set: tuit});