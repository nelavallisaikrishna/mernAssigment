const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const KeepSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    links: {
        type: String,
        required: true
    },
    status:{
        type:Boolean,
        required:false
    }
});
module.exports = Keep = mongoose.model("keeps", KeepSchema);