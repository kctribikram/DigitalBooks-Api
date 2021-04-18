const mongoose = require('mongoose')
const Reader = mongoose.model('Reader',{
    first_name: {
        type: String,
    },
    last_name: {
        type: String,
    },
    image: {
        type: String,
    },
    age: {
        type: Number,
    },
    contact: {
        type: Number,
    },
    email: {
        type: String,
        require: true
    },
    location: {
        type: String,
    },
    Username: {
        type: String,
        require: true
    },
    Password: {
        type: String,
        require: true
    },
    role: {
        type: String,
        enum:['Admin','Reader'],
        default:'Reader'
    }

})

module.exports = Reader;