const fetch = require("node-fetch");

const validateZipcode = (req, res, next) => {
    fetch(`https://api.postalpincode.in/pincode/${req.params.zipcode}`)
        .then(response => response.json())
        .then(data => {
            if(data[0].Status === "Success") {
                next();
                // console.log(`success`)
            }
            else {
                res.status(404).send("not found zipcode");
                // console.log(`not found`)
            }
        })
        .catch(err => console.log(err));
}

const validateZipcodePost = (req, res, next) => {
    fetch(`https://api.postalpincode.in/pincode/${req.body.postalcode}`)
        .then(response => response.json())
        .then(data => {
            if(data[0].Status === "Success") {
                next();
                // console.log(`success`)
            }
            else {
                res.status(404).send("not found zipcode");
                // console.log(`not found`)
            }
        })
        .catch(err => console.log(err));
}

module.exports = {
    validateZipcode,
    validateZipcodePost
}