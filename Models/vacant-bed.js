const mongoose = require("mongoose");

const vacantBedSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true

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
    }
});

const VacantBeds = new mongoose.model("vacantBeds", vacantBedSchema);

module.exports = { VacantBeds };