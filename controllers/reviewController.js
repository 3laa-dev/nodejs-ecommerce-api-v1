



const factory = require("./handlersFactory");
const Review = require("../models/reviewModel");


 


exports.createReview = factory.createOne(Review);

exports.getReviews = factory.getAll(Review);

exports.getReview = factory.getOne(Review);

exports.updateReview = factory.updateOne(Review);

exports.deleteReview = factory.deleteOne(Review);