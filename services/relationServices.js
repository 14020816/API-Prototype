    var dbHelper = require("../helper/dbHelper")
    var sqlBuilder =require("../helper/sqlBuilder")

    // dummy request data
    var req = {
        content_id: 'TSDV0000001',
        useco_id: 'TSDV',
        output_id: 'XXXXXXX',
        terminal_id: 'PC0001',
    }
    // create local variable for some function
    var content_id ;
    var useco_id ;
    var output_id ;
    var terminal_id;
    
    function getRelationConditionData(req)
    {
         content_id = req.content_id;
         useco_id = req.useco_id;
         output_id = req.output_id;
         terminal_id = req.uterminal_id;
    }
    // create sql string to connect database
    function createRelationArticleFullSql()
    {
        var result = new Array();
        var sql2 = sqlBuilder.getRelationTempate("ARTICLE_RELATIONS");
        var sql3 = sqlBuilder.buildPermisstionCondtions(useco_id, output_id);
        var mapValue = createMapValue(content_id, terminal_id, sql3);
        //console.log(mapValue);
        if(sql2)
        {
            //console.log(sql2);
            sql2.forEach(element => {
                for(const [key, value] of Object.entries(mapValue))
                {
                    element = element.replace(key, value);
                }
                result.push(element);
                //console.log(element);
                //console.log("\n");
            });
        }
        else
        {
            console.log("Template not found");
        }
        //console.log(result);
        return result;
        // builRelationFilterCondtion(sql.article.filter, 'fdfa', 'fasdf');
        // console.log(sql.article.filter);
    }

    
    String.prototype.replaceAll = function(search, replacement) {
        var target = this;
        return target.replace(new RegExp(search, 'g'), replacement);
    };
 
    // create mapValue object for relation services
    function createMapValue( content_id, terminal_id, sql)
    {
        return {'<content-id>': content_id, '<terminal-user>': terminal_id,'<permissionCondition>': sql };
    }

    function getRelationArticle()
    {
        var i = 1;
        var sql = createRelationArticleFullSql();
        sql.forEach(element => {
             console.log(element);
             console.log('\n');
            //console.log(i);
            i++;
           
        });
    }
    getRelationConditionData(req);
    getRelationArticle();

