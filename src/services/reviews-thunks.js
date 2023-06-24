import {createAsyncThunk} from "@reduxjs/toolkit";
import * as service from "./reviews-service";

export const findReviewsThunk = createAsyncThunk("reviews/findTuits",
                                                async () => await service.findReviews()
);

export const deleteReviewThunk = createAsyncThunk(
    'reviews/deleteTuit',
    async (reviewId) => {
        await service.deleteReview(reviewId)
        return reviewId;
    }
);

export const createReviewThunk = createAsyncThunk(
    "reviews/createTuit",
    async (review) => {
        return await service.createReview(review)
    }
);

export const updateReviewThunk = createAsyncThunk(
                                                 "reviews/updateTuit",
                                                 async (review) => {
                                                     return await service.updateReview(review);
                                                 }
);