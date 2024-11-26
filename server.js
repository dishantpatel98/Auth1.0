const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const PORT = 3000;
const server = express();
server.use(bodyParser.json());
const userRoutes = require("./routes");
userRoutes(server);




mongoose.Promise = global.Promise;

mongoose.connect("mongodb://127.0.0.1:27017").then((() => {
    console.log("The database is running nicely");
})).catch(function(err){
    console.log("Database Connection failed");
});


server.listen(PORT, ()=> {
    console.log(`The server is connected to ${PORT}`);
});