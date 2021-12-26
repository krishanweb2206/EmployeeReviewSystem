const express = require("express");
const passport = require("passport");
const router = express.Router();

const AdminController = require('../controllers/AdminController');

router.get("/assigntask", passport.checkAuthentication,AdminController.assignTask);





module.exports = router;