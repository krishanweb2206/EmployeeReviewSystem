const express = require("express");
const passport = require("passport");
const router = express.Router();

const ReviewController = require('../controllers/ReviewController');

router.post("/create_review/:id", passport.checkAuthentication,ReviewController.createReview);
router.get("/reviewdata",passport.checkAuthentication,ReviewController.reviewdata);

router.get("/edit/:id",passport.checkAuthentication, ReviewController.editReview);
router.get("/view/:id",passport.checkAuthentication, ReviewController.viewdata);

router.post('/updatedreview/:id',passport.checkAuthentication, ReviewController.updateReview)

router.get('/addreview',passport.checkAuthentication, ReviewController.addReview);
router.post("/addReviewfromadmin",passport.checkAuthentication,ReviewController.addReviewfromadmin);






module.exports = router;