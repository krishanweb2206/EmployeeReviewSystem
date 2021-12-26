const User = require("../models/user");
const Review = require('../models/review');

module.exports.assignTask = async function(req,resp){

    try
    {
        if(!req.isAuthenticated() || req.user.isAdmin == false) {
            return resp.redirect("/");
        }

        let users = await User.find({});
        return resp.render("assign_task", {users});
    }
    catch(error){
          console.log(`Error during assign task page :  ${error}`);
          resp.redirect("back");
    }
}