import axios from "axios";

const REVIEWS_API = "http://localhost:4000/api/reviews";

export const createReview = async (review) => {
    const response = await axios.post(REVIEWS_API, review);
    return response.data;
}

export const findReviews = async () => {
    const response = await axios.get(REVIEWS_API);
    return response.data;
}

export const deleteReview = async (rid) => {
    const response = await axios.delete(`${REVIEWS_API}/${rid}`)
    return response.data;
}

export const updateReview = async (review) => {
    const response = await axios.put(`${REVIEWS_API}/${review._id}`, review);
    return review;
}
