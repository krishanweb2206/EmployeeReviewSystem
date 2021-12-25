
module.exports.home = function(req,resp){
     return resp.redirect("/users/login");
}


module.exports.login = function(req,resp){
    return resp.render("sigin");
}

module.exports.signup = function(req,resp){
    return resp.render("signup");
}