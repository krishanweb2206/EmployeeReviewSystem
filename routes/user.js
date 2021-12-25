const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");

router.get("/login", UserController.login);
router.get('/SignUp',UserController.signup);

router.post("/create",UserController.CreateUser);
router.post("/create-session",UserController.CreateSession);






module.exports = router;