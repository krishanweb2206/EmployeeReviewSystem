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

module.exports.taskassigned = async function(req,resp){

     try {

       if (!req.isAuthenticated() || req.user.isAdmin == false) {
         return resp.redirect("/");
       }
       
       if(req.body.employee_name === req.body.reviewer_name)
       {
         return resp.redirect("/");
       }

       let to_employee = await User.findById(req.body.employee_name);
       let from_employee = await User.findById(req.body.reviewer_name);

       to_employee.evaluatefromother.push(from_employee);
       to_employee.save();

       from_employee.evaluatebyme.push(to_employee);
       from_employee.save();

       return resp.redirect('back');


     } catch (error) {
       console.log(`Error during assign task page :  ${error}`);
       resp.redirect("back");
     }

}

module.exports.EmployeeRecords = async function(req,resp){

    try{

       if (!req.isAuthenticated() || req.user.isAdmin == false) {
        return resp.redirect("/");
       }

        let users = await User.find({});
        return resp.render("employee_records", {users});

    } catch (error) {
       console.log(`Error during click on allEmployee :  ${error}`);
       resp.redirect("back");
    }
}

module.exports.AddUser = async function(req,resp){

    try {

      if (!req.isAuthenticated() || req.user.isAdmin == false) {
        return resp.redirect("/");
      }

       return resp.render("addUser");

    }catch (error) {
      console.log(`Error during click on allEmployee :  ${error}`);
      resp.redirect("back");
    }
}

module.exports.CreateUser = async function (req, resp) {
  try {

     if (!req.isAuthenticated() || req.user.isAdmin == false) {
       return resp.redirect("/");
     }

    if (req.body.password != req.body.confirmpassword) {
      return resp.redirect("back");
    }

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      const newuser = await User.create({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        isAdmin: false,
      });
      await newuser.save();

      if (!newuser) {
        console.log("error in creating new user");
        return resp.redirect("back");
      }
      return resp.redirect("/admin/employeerecords");
    } else {
      return resp.redirect("back");
    }
  } catch (error) {
    console.log(`Error during submit the sigup form:  ${error}`);
    resp.redirect("back");
  }
};

module.exports.ViewEmployee = async function(req,resp){

    
     try {
       if (!req.isAuthenticated() || req.user.isAdmin == false) {
         return resp.redirect("/");
       }

       let user = await User.findById(req.params.id);
       return resp.render("viewEmployee", { user });
     } catch (error) {
       console.log(`Error during click on allEmployee :  ${error}`);
       resp.redirect("back");
     }

}

module.exports.UpdateReqUser = async function(req,resp){

     try {

       if (!req.isAuthenticated() || req.user.isAdmin == false) {
         return resp.redirect("/");
       }

       let user = await User.findById(req.params.id);
       return resp.render("update_employee", { user });

     } catch (error) {
       console.log(`Error during click on allEmployee :  ${error}`);
       resp.redirect("back");
     }
}

module.exports.UpdatedUser = async function(req,resp){

    try {

         if (!req.isAuthenticated() || req.user.isAdmin == false) {
           return resp.redirect("/");
         }

        let user = await User.findById(req.params.id);
       
         user.name=req.body.name;
         user.password=req.body.password;
         user.isAdmin = req.body.admin;

         user.save();

         return resp.redirect("/admin/employeerecords");
     
    }catch(error) {
      console.log(`Error during click on allEmployee :  ${error}`);
      resp.redirect("back");
    }
}

module.exports.deleteEmployee = async function(req,resp){

    try{

       if (!req.isAuthenticated() || req.user.isAdmin == false) {
         return resp.redirect("/");
       }

      let id = req.params.id;

      let allusers = await User.find({});

      for(let i=0;i<allusers.length;i++){

        let index = await allusers[i].evaluatebyme.indexOf(id);

        if(index!==-1){
            while(index!=-1){
                  await allusers[i].evaluatebyme.splice(index,1);
                  index = allusers[i].evaluatebyme.indexOf(id);
            }
            await allusers[i].save();
        }

        index = await allusers[i].evaluatefromother.indexOf(id);

        if (index !== -1) {
          while (index != -1) {
            await allusers[i].evaluatebyme.splice(index, 1);
            index = allusers[i].evaluatebyme.indexOf(id);
          }
          await allusers[i].save();
        }

      }

      let reviews = await Review.find({from:id});
      for (let i = 0; i < reviews.length; i++) {
        await Review.findByIdAndDelete(reviews[i].id);
      }

      reviews = await Review.find({ for: id });
      for (let i = 0; i < reviews.length; i++) {
        await Review.findByIdAndDelete(reviews[i].id);
      }

      await User.findByIdAndDelete(id);

      return resp.redirect("/admin/employeerecords");


    }catch(error){
       console.log(`Error during click on allEmployee :  ${error}`);
       resp.redirect("back");
    }

}

module.exports.makeadmin = async function(req,resp){

    try {

        if (!req.isAuthenticated() || req.user.isAdmin == false) {
            return resp.redirect("/");
        }

        let user = await User.findById(req.body.admin_employee_name);

        if (user.isAdmin == true) {
          return resp.redirect("back");
        } else {
          user.isAdmin = true;
          await user.save();
        }

        return resp.redirect("back");

    } catch (error) {
      console.log(`Error during click on allEmployee :  ${error}`);
      resp.redirect("back");
    }



}