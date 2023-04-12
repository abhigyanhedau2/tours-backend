const catchAsync = require('./../utils/catchAsync');
const Review = require('./../models/Review');
const Tour = require('../models/Tour');

const getAllReviews = catchAsync(async (req, res, next) => {
    const allReviews = await Review.find();
    return res.status(200).json({
        status: 'success',
        results: allReviews.length,
        data: {
            reviews: allReviews
        }
    });
});

const getReview = catchAsync(async (req, res, next) => {
    const reviewId = req.body.id;
    const review = await Review.findById(reviewId);
    if (!review)
        return next(new AppError(404, 'No review found'));
    return res.status(200).json({
        status: 'success',
        data: {
            review
        }
    });
});

const postReview = catchAsync(async (req, res, next) => {
    const { userId, tourId, review, rating } = req.body;
    if (userId === undefined || userId !== req.user._id.toString())
        return next(new AppError(403, 'Forbidden. Unauthorized access'));
    if (tourId === undefined)
        return next(new AppError(404, 'No tour found.'));
    if (review === undefined || rating === undefined)
        return next(new AppError(400, 'Add complete review and rating.'));
    if (rating < 1 || rating > 5)
        return next(new AppError(400, 'Rating must be between 1 and 5.'));
    const tour = await Tour.findById(tourId);
    if (!tour)
        return next(new AppError(404, 'No tour found.'));
    const newReview = await Review.create({
        userId,
        tourId,
        review,
        rating
    });
    const updatedRating = (tour.rating + rating) / tour.reviews.length + 1;
    const updatedReviews = tour.reviews;
    updatedReviews.push(newReview.id);
    await Tour.updateById(tourId, { rating: updatedRating, reviews: updatedReviews });
    return res.status(201).json({
        status: 'success',
        data: {
            review: newReview
        }
    });
});

const updateReview = catchAsync(async (req, res, next) => {
    const { userId, tourId, reviewId, review, rating } = req.body;
    if (userId === undefined || userId !== req.user._id.toString())
        return next(new AppError(403, 'Forbidden. Unauthorized access'));
    if (tourId === undefined)
        return next(new AppError(404, 'No tour found.'));
    if (review === undefined || rating === undefined)
        return next(new AppError(400, 'Add complete review and rating to update.'));
    if (reviewId === undefined)
        return next(new AppError(404, 'No review found.'));
    if (rating < 1 || rating > 5)
        return next(new AppError(400, 'Rating must be between 1 and 5.'));
    const tour = await Tour.findById(tourId);
    const toBeUpdatedReview = await Review.findById(reviewId);
    if (!tour)
        return next(new AppError(404, 'No tour found.'));
    if (!toBeUpdatedReview)
        return next(new AppError(404, 'No review found.'));
    const updatedRating = (tour.rating - review.rating + rating) / tour.reviews.length + 1;
    const updatedReview = await Review.findByIdAndUpdate(reviewId, { rating, review }, { new: true });
    await Tour.findByIdAndUpdate(tourId, { rating: updatedRating });
    return res.status(200).json({
        status: 'success',
        data: {
            review: updatedReview
        }
    });
});

const deleteReview = catchAsync(async (req, res, next) => {
});

module.exports = { getAllReviews, getReview, postReview, updateReview, deleteReview };