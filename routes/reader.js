const express = require('express')
const router = express.Router()
const Reader = require('../models/reader')
const {check, validationResult} = require('express-validator')
const bcryptjs = require('bcryptjs')
const upload = require('../middleware/upload');
const jwt = require('jsonwebtoken')


router.post('/reader/register', [
    check('Username',"Username is required!").not().isEmpty(),
    check('email', "Invalid email").isEmail(),
    check('Password', 'password is required').not().isEmpty()

], function(req,res){
const errors = validationResult(req);

if(errors.isEmpty()){
    const first_name = req.body.first_name
    const last_name = req.body.last_name
    const File= req.body.File;
    const age = req.body.age
    const contact = req.body.contact
    const email = req.body.email
    const location = req.body.location
    const Username = req.body.Username
    const Password = req.body.Password
    const role = req.body.role
    bcryptjs.hash(Password, 10, function(err, hash){
        const data = new Reader({first_name: first_name, last_name: last_name, image: File, age:age, contact:contact, email: email, location: location, Username: Username,Password:hash, role: role})
        data.save()
        .then(function(result){
            res.status(201).json({message: "Successfully added!!", reader: result})
        })
        .catch(function(err){
            res.status(500).json({error: err})
        })
    })
}
else{
    res.status(400).json(errors.array());
    }
})


router.put('/reader/update/:id', function(req,res){
    
    const id = req.params.id
    console.log(id) 
    const first_name = req.body.first_name
    const last_name = req.body.last_name
    const age = req.body.age
    const contact = req.body.contact
    const email = req.body.email 
    const location = req.body.location
    
    Reader.updateOne({_id : id},
        {first_name: first_name, last_name: last_name, age:age, contact:contact, email: email, location: location })
        .then(function(){
            res.status(200).json({message: "success"})
        })
        .catch(function(e){
            res.status(500).json({error: e})
        })
})


router.post('/reader/login', function(req, res){
    const Username = req.body.Username;
    const Password = req.body.Password;
    Reader.findOne({Username : Username})
    .then(function(readerData){
        if(readerData===null){
          return  res.status(401).json({message: "Invalid credentials!!"})
        }
        //if username exists
        bcryptjs.compare(Password, readerData.Password, function(err, result){
            if(result==false){
                return res.status(401).json({message: "Invalid credentials"}
                )
            }
           const token = jwt.sign({userId : readerData._id},'anysecretkey');
           console.log('token .'+ token);
        // res.send(token)
           return res.status(200).json({
               message : "Successful",
               token : token,
               data:readerData._id,
               role:readerData.role
           })
        })
    })
    .catch(function(e){
        res.status(500).json({message: e})
    })
})



// router.get('/reader/show', function(req, res){
//     Reader.find().then(function(data1){
//         res.send(data1);
//     })
// })




// router.get('/user/:id', function(req,res){
//     const userID = req.params.id;
//     console.log(userID)
 
//    const user= Reader.findById(userID)
//         .then(function(data){
//             res.status(200).json({ message:"success",reader:data})
//         })
//         .catch(function(e){
//             res.status(500).json({error : e})
//         })
// })
module.exports = router;