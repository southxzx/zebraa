const express = require('express')
const router = express.Router()

const reviewController = require('../controllers/review.controller');

// Add new review
router.post('/add',reviewController.addReview);

// Get all reviews by product ID
router.get('/get',reviewController.getAllReviewsByProductID);


module.exports = router;