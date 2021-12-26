const express = require("express");
const passport = require('passport');
const router = express.Router();
const UserController = require("../controllers/UserController");

router.get("/login", UserController.login);
router.get('/SignUp',UserController.signup);

router.post("/create",UserController.CreateUser);

//use passport as a middleware for authenication
router.post("/create-session",passport.authenticate(
    'local',
    {failureRedirect:'/users/login'}
),UserController.CreateSession);






module.exports = router;