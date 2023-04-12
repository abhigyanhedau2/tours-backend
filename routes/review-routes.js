const express = require('express');
const reviewControllers = require('./../controllers/review-controllers');

const router = express.Router();

const { getAllReviews, getReview, postReview, updateReview, deleteReview } = reviewControllers;

router.route('/getAllReviews').get(getAllReviews);

router.route('/')
    .get(getReview)
    .post(postReview)
    .patch(updateReview)
    .delete(deleteReview);

module.exports = router;