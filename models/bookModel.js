const mongoose = require('mongoose');
const Book = mongoose.model('Book', {
    Title:{
        type: String
    },
    Auther:{
        type: String
    },
    Description:{
        type: String
    },
    PublisheDate:{
        type: String
     },
     ISBNno:{
         type: String
     },
     Edition:{
        type: String
     },
     Language:{
         type: String
     },
     Publisher:{
         type: String
     },
     Cost:{
         type: String
     },
     Image:{
         type: String
     },
     Audio:{
        type: String
    },
     File:{
        type: String
    },
     Rating:{
         type: String
     },
})

module.exports = Book;




