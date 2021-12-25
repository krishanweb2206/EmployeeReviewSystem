const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({

    review:{
        type:String,
        required:true
    },

    from:{

    },

    for:{

    },
},{
    timestamps:true
});

const Review = mongoose.model('Review',ReviewSchema);
module.exports =Review;