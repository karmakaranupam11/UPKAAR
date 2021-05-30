const fetch = require("node-fetch");
const {findBedVacancyByPostalcode} = require("../../Controllers/beds-vacancy");

const checkForLonLatVacancy = async (req, res, next) => {
    if(req.query.lat && req.query.lon) {
        let datas = new Array();
        await fetch(`http://www.geoplugin.net/extras/nearby.gp?lat=${req.query.lat}&lon=${req.query.lon}&radius=10&format=json`)
            .then(response => response.json())
            .then(lists => {
                for(list of lists) {
                    datas.push({longitude: list.geoplugin_longitude, latitude: list.geoplugin_latitude});
                }
                // console.log("datas : ", datas)
            }).catch(err => {
                console.log("err : ", err);
                res.status(500).send("error getting lon lat");
            })
        let postalcodes = new Array();
        for(d of datas) {
            await fetch(`http://www.geoplugin.net/extras/postalcode.gp?lat=${d.latitude}&lon=${d.longitude}&format=json`)
                .then(response => response.json())
                .then(data => {
                    if(!postalcodes.includes(data.geoplugin_postCode)) {
                        postalcodes.push(data.geoplugin_postCode);
                    }
                }).catch(err => {
                    console.log("err : ", err);
                    res.status(500).send("error getting postal codes from lon lat vac");
                })
        }
        // console.log("postalcodes : ", postalcodes);
        let finaldata = new Array();
        for(p of postalcodes) {
            let ans = await findBedVacancyByPostalcode(p);
            if(ans.length) {
                if(!finaldata.length) {
                    finaldata = ans;
                } else {
                    finaldata.push(ans);
                }
            }
        }
        // console.log("finaldata : ", finaldata);
        res.status(200).send(finaldata);
    } else {
        next();
    }
}

module.exports = {
    checkForLonLatVacancy
}