const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");

router.get("/login", UserController.login);
router.get('/SignUp',UserController.signup);





module.exports = router;