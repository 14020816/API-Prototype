'use-strict';

var template = require("../config/sqlTemplate");

module.exports.getTempate = (queryId) => {
    try {
        let result = template[queryId];
        return result
    } catch(err) {
        console.log(err);
    }
}
module.exports.replaceVariable = (sql, mapValue) => {
    for (const [key, value] of mapValue.entries()) {
        sql = sql.replace(key, value);
    }
    return sql;
}

module.exports.getRelationTempate = (queryId) => {
    try {
        let result = template[queryId];
        return result
    } catch(err) {
        console.log(err);
    }
}

String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

module.exports.escapeRegExp = (str) => {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}


module.exports.buildPermisstionCondtions = (useco_id, output_id) =>
{
    try {
        var sql = this.getTempate('PERMISSTION_CONDTIONS');
        sql = sql.replaceAll('<usecoid>', useco_id);
        sql = sql.replaceAll('<outputid>', output_id);
        return sql;
    } catch (error) {
        console.log(error);
    }
}