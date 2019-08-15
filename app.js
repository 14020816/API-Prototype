//import  { getEmployees }  from "./controllers/searchController";
var searchController = require('./controllers/searchController');
const express = require('express');

var app = express();

const PORT = 3000;

app.listen(PORT, function() {
    console.log(`Server running on port: ${PORT}`);
})

app.route("/employees").get(searchController.getEmployees);




Windows_2:13.230.118.17
Administrator / 3UTxJokgES)Oz9mgu.LT%VbgnE4Y@gpn
