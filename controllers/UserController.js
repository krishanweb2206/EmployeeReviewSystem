const User = require('../models/user');


module.exports.home = function(req,resp){

    if (!req.isAuthenticated()) {
        return resp.redirect("/users/login");
    }

    return resp.render("home");
}


module.exports.login = function(req,resp){

    if (!req.isAuthenticated()) {
        return resp.render("sigin");
    }

    return resp.redirect('/');
}

module.exports.signup = function(req,resp){

    if (!req.isAuthenticated()) {
        return resp.render("signup");
    }

     return resp.redirect("/");
}

module.exports.CreateUser = async function(req,resp){

    try{

        if(req.body.password != req.body.confirmpassword){
            return resp.redirect('back');
        }

        const user = await User.findOne({email:req.body.email});

        if(!user){
            const newuser = await User.create({
            name:req.body.username,
            email:req.body.email,
            password:req.body.password,
            isAdmin:false,
            });
            await newuser.save();

            if (!newuser) {
            console.log("error in creating new user");
            return resp.redirect("back");
            }
            return resp.redirect("/users/login");
    }
    }catch(error){
         console.log(`Error during submit the sigup form:  ${error}`);
        resp.redirect('back');
    }
    
}

module.exports.CreateSession = function(req,resp)
{
    return resp.redirect("/");
}

module.exports.signout = function (req, res) {

  req.logout();
  return res.redirect("/");

};