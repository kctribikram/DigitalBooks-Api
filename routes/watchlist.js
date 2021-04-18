const express = require('express');
const router = express.Router();
const Watchlist = require('../models/watchlistModel');
const authentication = require('../middleware/authentication')
const upload = require('../middleware/upload');

router.post('/watchlist/insert', authentication.verifyUser, function(req, res){
    console.log("Requested")
    const watchlist = new Watchlist(req.body);
    watchlist.save().then(function(){
        res.status(201).json({message:"success", data:watchlist})
    }).catch(function(e){
        res.status(500).json({error:e})
    });
})

router.get('/watchlist/:id', function(req, res){
    const watchlistID = req.params.id
    console.log(watchlistID)

    const watchlist=Watchlist.find({userid:watchlistID})
    .then(function(data){
        res.status(200).json({message:"success", data:data})
        console.log(data)
    })
    .catch(function(e){
        res.status(500).json({error:e})
    });
})
   
router.delete("/watchlist/delete/:id", function(req,res){
    const wid = req.params.id;
    Watchlist.deleteOne({_id : wid})
        .then(function(){
        res.status(200).json({message: "Deleted successfully!"})
    })
    .catch(function(e){
        res.status(500).json({error: e})
    })
})


module.exports = router;