const User = require('../models/user');
const Review = require('../models/review');


module.exports.createReview = async function(req,resp){
  
    try {

        if (!req.isAuthenticated()) {
            return resp.redirect("/");
        }

        let to_user = await User.findById(req.params.id);
        let from_user = req.user;
        let feedback = req.body.new_review;

        await Review.create({
          review:feedback,
          from: from_user,
          for: to_user,
        });

        const index = req.user.evaluatebyme.indexOf(req.params.id);
        req.user.evaluatebyme.splice(index, 1);
        req.user.save();

        return resp.redirect("back");

    }catch (error) {
        console.log(`Error during assign task page :  ${error}`);
        resp.redirect("back");
    }

}

module.exports.reviewdata = async function(req,resp){

  try {

    if (!req.isAuthenticated() || req.user.isAdmin == false) {
      return resp.redirect("/");
    }

    let allreview = await Review.find({});

    allreviewdata = [];

    for (let r of allreview) {
      let fromuser = await User.findById(r.from._id);
      let foruser = await User.findById(r.for._id);
      let review = r.review;

      let data = {
        fromemailid: fromuser.email,
        foremailid: foruser.email,
        feedback: review,
        id: r._id,
      };

      allreviewdata.push(data);
    }

    return resp.render("review_records", { allreviewdata });

  } catch (error) {
    console.log(`Error during click on allEmployee :  ${error}`);
    resp.redirect("back");
  }
}


module.exports.viewdata = async function(req,resp){

    try {

      if (!req.isAuthenticated() || req.user.isAdmin == false) {
        return resp.redirect("/");
      }

      let reviewdata = await Review.findById(req.params.id);
      let fromuser = await User.findById(reviewdata.from._id);
      let foruser = await User.findById(reviewdata.for._id);
      let review = reviewdata.review;

      let data = {
        fromemail: fromuser.email,
        foremail: foruser.email,
        feedback: review,
      };

      return resp.render("review_view", { data });

    } catch (error) {
      console.log(`Error during click on allEmployee :  ${error}`);
      resp.redirect("back");
    }
     
}

module.exports.editReview = async function(req,resp){

    try {

      if (!req.isAuthenticated() || req.user.isAdmin == false) {
        return resp.redirect("/");
      }

      let reviewdata = await Review.findById(req.params.id);
      let fromuser = await User.findById(reviewdata.from._id);
      let foruser = await User.findById(reviewdata.for._id);
      let review = reviewdata.review;
      let rid = req.params.id;

      let data = {
        fromemail: fromuser.email,
        foremail: foruser.email,
        feedback: review,
      };

      return resp.render("updatereview", { data,rid});

    } catch (error) {
      console.log(`Error during click on allEmployee :  ${error}`);
      resp.redirect("back");
    }
}

module.exports.updateReview = async function(req,resp){

    try{

        if (!req.isAuthenticated() || req.user.isAdmin == false) {
          return resp.redirect("/");
        }

        let updatedreviewdata = await Review.findById(req.params.id);

        updatedreviewdata.review = req.body.feedback;
        updatedreviewdata.save();

        return resp.redirect('/review/reviewdata')


    }catch(error){
        console.log(`Error during click on allEmployee :  ${error}`);
        resp.redirect("back");
    }

}


module.exports.addReview = async function(req,resp){

     try {

       if (!req.isAuthenticated() || req.user.isAdmin == false) {
         return resp.redirect("/");
       }

        let users = await User.find({});
        let loggeduser=req.user.email;

       return resp.render('addreview',{loggeduser,users})
       
     } catch (error) {
       console.log(`Error during click on allEmployee :  ${error}`);
       resp.redirect("back");
     }
}

module.exports.addReviewfromadmin = async function(req,resp){

    try {
      if (!req.isAuthenticated() || req.user.isAdmin == false) {
        return resp.redirect("/");
      }

      let reviewdetails = await User.findById(req.body.reviewer_name);

      if(req.body.from_email === reviewdetails.email){
          return resp.redirect("/");
      }else{
           let newreview = await Review.create({
             review: req.body.new_added_feedback,
             from: req.user,
             for: reviewdetails,
           });

           reviewdetails.evaluatefromother.push(newreview._id);

           reviewdetails.save();
           newreview.save();

      }
      return resp.redirect("/review/reviewdata");

    } catch (error) {
      console.log(`Error during click on allEmployee :  ${error}`);
      resp.redirect("back");
    }


}