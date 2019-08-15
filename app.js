//import  { getEmployees }  from "./controllers/searchController";
var searchController = require('./controllers/searchController');
const express = require('express');

var app = express();

const PORT = 3000;

app.listen(PORT, function() {
    console.log(`Server running on port: ${PORT}`);
})

app.route("/employees").get(searchController.getEmployees);




