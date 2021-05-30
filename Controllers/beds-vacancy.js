const mongoose = require("mongoose");

const {VacantBeds} = require("../Models/vacant-bed");

const addBedVacancy = async (body) => {
    return await VacantBeds.create({
        name: body.username,
        city: body.city,
        usercontact: body.contact,
        postalcode: body.postalcode,
        state: body.state,
        noOfBeds: body.noOfBeds,
        hospitalName: body.hospitalName
    }, (err, data) => {
        if(err) {
            console.log("Error: insertion of new content denied from database");
            console.log(err);
            return;
        }
        // console.log("document created : ", data);
        return data;
    });
}

const findAllBedVacncy = async () => {
    return await VacantBeds.find({}, (err, data) => {
        if(err) {
            console.log("Error: retrieving data from database");
            return;
        }
        // console.log("data : ", data);
        return data;
    });
}

const findBedVacancyByPostalcode = async (zipcode) => {
    return await VacantBeds.find({postalcode: zipcode}, (err, data) => {
        if(err) {
            console.log("Error: retrieving data from database");
            return;
        }
        // console.log("filtered data : ", data);
        return data;
    });
}

module.exports =  {
    addBedVacancy,
    findAllBedVacncy,
    findBedVacancyByPostalcode
}