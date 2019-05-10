var oracledb = require('oracledb');

module.exports.executeSelect = async function (sql) {
    let connection;

    try {
        connection = await oracledb.getConnection(  {
            user          : 'dainv',
            password      : 'abcd_419',
            connectString : "(DESCRIPTION =(ADDRESS = (PROTOCOL = TCP)(HOST = 10.116.43.46)(PORT = 1521))(CONNECT_DATA =(SID = Mach3)))"
        });

        // For a complete list of options see the documentation.
        options = {
            outFormat: oracledb.OBJECT   // query result format
            // extendedMetaData: true,   // get extra metadata
            // fetchArraySize: 100       // internal buffer allocation size for tuning
        };

        result = await connection.execute(sql, {}, options);
        return result.rows;
    } catch (err) {
        console.error(err);
      } finally {
        if (connection) {
          try {
            await connection.close();
          } catch (err) {
            console.error(err);
          }
        }
    }
}