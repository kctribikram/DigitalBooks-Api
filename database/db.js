const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/digital_books', {
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology : true
}).then(function(data){
   console.log("Connected")
}).catch(function(e){
    console.log("Unable to connect")
})