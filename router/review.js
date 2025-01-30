const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const Review = require("../Models/review.js");
const Listing = require("../Models/listing");
const reviewController =require("../controller/review.js");
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js");




//Reviews
//Post Review Route
router.post("/",isLoggedIn,
 validateReview, 
 wrapAsync (reviewController.createReview))


//Delete Review Route
router.delete("/:reviewId",isLoggedIn,isReviewAuthor, wrapAsync( 
reviewController.destroyReview
))

module.exports=router;