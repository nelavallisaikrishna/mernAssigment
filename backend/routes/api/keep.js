const express = require("express");
var ObjectId = require('mongoose').Types.ObjectId
const router = express.Router();
// Load input validation
const validateKeepInput = require("../../validation/keep");
const Keep = require("../../models/Keep");


router.put("/", (req, res) => {
    // Form validation
    const { errors, isValid } = validateKeepInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const newKeep = new Keep({
        title: req.body.title,
        description: req.body.description,
        links: req.body.links,
        status : req.body.status
    });
    newKeep.save();
    res.json({
        success: true,
        data: newKeep
    });
});


router.post("/", (req, res) => {
    // Form validation
    var query = {
        _id: new ObjectId(req.body.id)
    };
    var  updateObj = {
        status : !req.body.status
    }
    Keep.updateOne(query, {$set: updateObj}, function (err, doc) {
        res.json({
            success: true,
            data: "updated"
        });
    })

});


router.get("/", async(req, res) => {
   const result = await Keep.find();
    res.json({
        success: true,
        data: result
    });
});
module.exports = router;