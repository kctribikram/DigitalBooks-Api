const mongoose=require('mongoose')
const {Book}=require('./bookModel')
const Watchlist = mongoose.model('watchlist', {
    userid:{
        type: String,
    },
    book:{
        type:{Book},
    }
})
module.exports=Watchlist;