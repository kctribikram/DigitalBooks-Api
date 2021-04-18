const express = require('express');
const router = express.Router();
const Book = require('../models/bookModel');
const authentication = require('../middleware/authentication')
const upload = require('../middleware/upload');

router.post('/book/insert', authentication.verifyUser, upload.fields([{name: 'Image', maxCount: 1}, {name: 'Audio', maxCount: 1}, {name: 'File', maxCount: 1}]), function(req, res){
    console.log(req.files)
    if(req.files==undefined){
        return res.status(400).json({
            message: "Invalid file format!!"
        })
    }
    const Title= req.body.Title;
    const Auther= req.body.Auther;
    const Description =req.body.Description;
    const PublisheDate= req.body.PublisheDate;
    const ISBNno= req.body.ISBNno;
    const Edition= req.body.Edition;
    const Language= req.body.Language;
    const Publisher= req.body.Publisher;
    const Cost= req.body.Cost;
    const Image= req.body.Image;
    const Audio= req.body.Audio;
    const File= req.body.File;
    const pathi = req.files.Image[0].path;
    const patha = req.files.Audio[0].path;
    const pathf = req.files.File[0].path;
    const Rating= req.body.Rating;

    const bdata = new Book({Title: Title, Auther: Auther,Description: Description, PublisheDate: PublisheDate,
    ISBNno: ISBNno, Edition: Edition, Language: Language, Publisher: Publisher,Cost: Cost,Image: pathi, Audio: patha, File: pathf, Rating: Rating})
    bdata.save()
    .then(function(result){
        res.status(201).json({message: "Book added!!", data: result})
    })
    .catch(function(ee){
        res.status(500).json({message: ee})
    })
})

router.put('/book/update', function(req,res){
    const Title= req.body.Title;
    const Auther= req.body.Auther;
    const Description = req.body.Description;
    const PublisheDate= req.body.PublisheDate;
    const ISBNno= req.body.ISBNno;
    const Edition= req.body.Edition;
    const Language= req.body.Language;
    const Publisher= req.body.Publisher;
    const Cost= req.body.Cost;
    const Image= req.body.Image;
    const bid=req.body.bid;
    Book.updateOne({_id : bid},
        {Title: Title, Auther: Auther, Description: Description, PublisheDate: PublisheDate, ISBNno: ISBNno, Edition: Edition, Language: Language, Publisher: Publisher,Cost: Cost,Image: Image})
        .then(function(){
            res.status(200).json({message: "Updated successfully!"})
        })
        .catch(function(e){
            res.status(500).json({error: e})
        })
})

router.delete("/book/delete/:id", function(req,res){
    const bid = req.params.id;
    Book.deleteOne({_id : bid})
        .then(function(){
        res.status(200).json({message: "Deleted successfully!"})
    })
    .catch(function(e){
        res.status(500).json({error: e})
    })
})

// router.get("/book/show", function(req, res){
//      Book.find().then(function(data){
//         res.status(200).json({success: true, data : data})
//     }).catch(function(e){
//         res.status(500).json({error : e})
//     })
// })

// router.get("/book/single/:id", function(req,res){
//     const bid = req.params.id;
//     Book.findOne({_id: bid}).then(function(data){
//         res.status(200).json(data)
//     }).catch(function(e){
//         res.status(500).json({error : e})
//     })
// })

module.exports = router;
