const express = require("express");
const cookieparser = require('cookie-parser');

const PORT = process.env.PORT || 4747;

const app = express();

// using the middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieparser());


const {db} = require("./config/db");

const postRoute = require("./routes/api/posts");
const userapi = require("./routes/api/users");

app.use("/api/vacancy", require("./routes/api/beds-vacancy").route);
app.use("/api",postRoute);
app.use("/api",userapi);
app.use("/register", express.static(__dirname+"/public/register"));
app.use("/", express.static(__dirname + "/public/"));
app.use("/reset",express.static(__dirname+"/public/reset"));
app.use("/home", express.static(__dirname + "/public/home"));
app.use("/donate", express.static(__dirname + "/public/donate"));
app.use("/requirement", express.static(__dirname + "/public/requirement"));
app.use("/vaccine", express.static(__dirname + "/public/vaccine"));

app.listen(PORT, () => {
    console.log("server started at port : ", PORT);
});