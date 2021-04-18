const mongoose = require('mongoose');

const Rating = mongoose.model("Rating",{
    rating:{
        type:Number,
        enum:[1,2,3,4,5]
    },
    comment:String,
    ratedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Reader'
    }
})
module.exports = Rating