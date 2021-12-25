const User = require('../models/user');


module.exports.home = function(req,resp){
     return resp.redirect("/users/login");
}


module.exports.login = function(req,resp){
    return resp.render("sigin");
}

module.exports.signup = function(req,resp){
    return resp.render("signup");
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
            isAdmin: false,
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
    resp.end("<h1>.............</h1>")
}