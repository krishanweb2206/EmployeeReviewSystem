
module.exports.home = function(req,resp){
     return resp.redirect("/users/login");
}


module.exports.login = function(req,resp){
    return resp.render("login");
}