const mongoose = require("mongoose");

const post = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    organizationname : {
         type: String,
         required : true
    },
    address : {
        type : String,
        required : true
    },
    date: {
        type: Date,
        default: Date.now,
    },
    usercontact: {
        type: Number,
        required: true
    },
    postalcode: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    noOfBeds: {
        type: Number,
        required: true
    },
    hospitalName: {
        type: String,
        default: "Not Defined"
    },

});

const Posts = new mongoose.model("posts", post);

module.exports = { Posts };