//import { getEmployees }  from "../services/searchServices"
var searchServices = require("../services/searchServices");
module.exports.getEmployees = async function (req, res, next)  {
    res.statusCode = 200;
    res.json(await searchServices.getEmployees());
}