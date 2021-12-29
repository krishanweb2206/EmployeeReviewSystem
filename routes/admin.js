const express = require("express");
const passport = require("passport");
const router = express.Router();

const AdminController = require('../controllers/AdminController');

router.get("/assigntask", passport.checkAuthentication,AdminController.assignTask);
router.post("/taskassigned",passport.checkAuthentication,AdminController.taskassigned);

router.get("/employeerecords",passport.checkAuthentication,AdminController.EmployeeRecords);
router.get("/adduser",passport.checkAuthentication,AdminController.AddUser);
router.get("/update/:id", passport.checkAuthentication, AdminController.UpdateReqUser);
router.post("/UpdatedUser/:id",passport.checkAuthentication, AdminController.UpdatedUser);
router.post("/create_user",passport.checkAuthentication, AdminController.CreateUser);
router.get("/view/:id",passport.checkAuthentication, AdminController.ViewEmployee);

router.get("/delete/:id", passport.checkAuthentication, AdminController.deleteEmployee);

router.post("/makeadmin",passport.checkAuthentication, AdminController.makeadmin);





module.exports = router;