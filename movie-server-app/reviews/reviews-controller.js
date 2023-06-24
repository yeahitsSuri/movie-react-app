import * as reviewsDao from "./reviews-dao.js";

const createReview = async (req, res) => {
    const newReview = req.body;
    // Properties that can be initialized:
    newReview.time = new Date();
    newReview.likes = 0;
    newReview.liked = false;
    newReview.dislikes = 0;
    newReview.disliked = false;
    newReview.adminPicked = false;
    const insertedReview = await reviewsDao.createReview(newReview);
    res.json(insertedReview);
}

const findReviews = async (req, res) => {
    const reviews = await reviewsDao.findReviews();
    res.json(reviews);
}

const updateReview = async (req, res) => {
    const reviewId = req.params["rid"];
    const updates = req.body;
    const status = await reviewsDao.updateReview(reviewId, updates);
    res.json(status);
}

const deleteReview = async (req, res) => {
    const reviewIdToDelete = req.params["rid"];
    const status = await reviewsDao.deleteReview(reviewIdToDelete);
    res.json(status);
}

export default (app) => {
    app.post('/api/reviews', createReview);
    app.get('/api/reviews', findReviews);
    app.put('/api/reviews/:rid', updateReview);
    app.delete('/api/reviews/:rid', deleteReview);
}
