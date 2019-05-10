var dbHelper = require("../helper/dbHelper")
var template = require("../config/sqlTemplate")
var constant = require("../config/constant")
var sqlBuilder =require("../helper/sqlBuilder")

module.exports.getEmployees = function () {
    let selectSql = "SELECT * FROM employees";

    let employees = dbHelper.executeSelect(selectSql);
    let queryId = constant.GET_ARTICLE_LIST;
    
    let sql = sqlBuilder.getTempate(queryId);

    var mapValue = new Map();
    mapValue.set("<terminal-user>", "okada");
    mapValue.set("<get-count>", "50");
    mapValue.set("<offset>", "0");

    sql = sqlBuilder.replaceVariable(sql, mapValue);
    console.log(sql);
    return employees;
} 