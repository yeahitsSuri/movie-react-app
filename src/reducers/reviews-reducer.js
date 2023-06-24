import {createSlice} from "@reduxjs/toolkit";
import {
    createReviewThunk,
    deleteReviewThunk,
    findReviewsThunk,
    updateReviewThunk
} from "../services/reviews-thunks";

const initialState = {
    reviews: [],
    loading: false,
}

const reviewsSlice = createSlice(
    {
        name: "reviews",
        initialState,
        reducers: {},
        extraReducers: {
            [updateReviewThunk.fulfilled]:
                (state, {payload}) => {
                    state.loading = false;
                    const reviewIdx = state.reviews.findIndex((r) => r._id === payload._id);
                    state.reviews[reviewIdx] = {...state.reviews[reviewIdx], ...payload};
                },
            [createReviewThunk.fulfilled]:
                (state, {payload}) => {
                    state.loading = false;
                    state.reviews.push(payload);
                },
            [deleteReviewThunk.fulfilled]:
                (state, {payload}) => {
                    state.loading = false;
                    state.reviews = state.reviews.filter(r => r._id !== payload);
                },
            [findReviewsThunk.pending]:
                (state) => {
                    state.loading = true
                    state.reviews = []
                },
            [findReviewsThunk.fulfilled]:
                (state, {payload}) => {
                    state.loading = false;
                    state.reviews = payload;
                },
            [findReviewsThunk.rejected]:
                (state, action) => {
                    state.loading = false;
                    state.error = action.error;
                }
        },
    }
);

export default reviewsSlice.reducer;