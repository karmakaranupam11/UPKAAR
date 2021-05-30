const express = require("express");

const PORT = process.env.PORT || 4747;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const {db} = require("./config/db");

app.use("/api/vacancy", require("./routes/api/beds-vacancy").route);

app.use("/", express.static(__dirname + "/public"));
app.use("/donate", express.static(__dirname + "/public/donate"));
app.use("/requirement", express.static(__dirname + "/public/requirement"));

app.listen(PORT, () => {
    console.log("server started at port : ", PORT);
});