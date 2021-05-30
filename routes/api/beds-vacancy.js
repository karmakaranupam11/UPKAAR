const route = require("express").Router();
const { validateZipcode, validateZipcodePost } = require("../middlewares/validate-zipcode");
const { checkForLonLatVacancy } = require("../middlewares/check-lonlat");
const { addBedVacancy, findAllBedVacncy, findBedVacancyByPostalcode } = require("../../Controllers/beds-vacancy");

route.get("/", checkForLonLatVacancy, async (req, res) => {
    let data = await findAllBedVacncy();
    if(data)
        res.status(200).send(data);
    else
        res.status(204).send(data);
});

route.get("/:zipcode", validateZipcode, async (req, res) => {
    let data = await findBedVacancyByPostalcode(req.params.zipcode);
    if(data)
        res.status(200).send(data);
    else
        res.status(204).send(data);
});

route.post("/", validateZipcodePost, async (req, res) => {
    let addedData = await addBedVacancy(req.body);
    res.status(200).send(addedData);
});

module.exports = { route }