var express = require("express");
var app = express();
var routes = require("./routes/router");

app.use("/", routes).listen(3000);
