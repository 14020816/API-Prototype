module.exports = Object.freeze({
    "GET_ARTICLE_LIST": "( SELECT * FROM (\
SELECT * FROM (\
SELECT \
NEWSITEM.NEWSITEMID, \
NEWSITEM.RECVDATE,\
SENDSTATUSSUM.NEWESTOUTPUTID,\
NEWSITEM.SYUKKONO,\
NEWSITEM.PARTSYUKKONO,\
NEWSITEM.SMALLCLASS,\
NEWSITEM.FORMATCLASS,\
NEWSITEM.GENRECD,\
NEWSITEM.OPERATIONDATE,\
NEWSITEM.REPLACEMENTCOUNT,\
NEWSITEM.HEADLINE,\
NEWSITEM.JACSNO,\
NEWSITEM.JACSENTRYINDICATE,\
NEWSITEM.EMBARGO,\
NEWSITEM.SENDTO,\
NEWSITEM.SZKBN,\
NEWSITEM.FLASHCLASS,\
NEWSITEM.SPORTITEMCLASS,\
NEWSITEM.MACHCLASS,\
NEWSITEM.MACHCLASSDETAIL,\
NEWSITEM.SENDSEQTOTAL,\
NEWSITEM.SHUBETSU,\
NEWSITEM.SAVECLASS,\
(SELECT SETGENREKANJI_A.KANJI FROM SETGENREKANJI_A WHERE USECOID='<usecoid>' AND SAVECLASS=NEWSITEM.SAVECLASS AND GENRECD=NEWSITEM.GENRECD) AS GENRENAME,\
(SELECT COUNT(NEWSITEMID_TO) FROM CONTENTSLINKINFO WHERE CONTENTSLINKINFO.NEWSITEMID_FROM = NEWSITEM.NEWSITEMID AND CONTENTSLINKINFO.LINK_PATTERN = 'C') AS RELATIONCOUNT\
FROM NEWSITEM, SENDSTATUSSUM\
WHERE NEWSITEM.NEWSITEMID = SENDSTATUSSUM.NEWSITEMID(+) \
AND SENDSTATUSSUM.TERMINALUSER(+) =  '<terminal-user>' \
AND <filterCondition>\
) T1  WHERE <permissionCondition> ORDER BY RECVDATE DESC, NEWSITEMID DESC\
)  OFFSET <offset> ROWS FETCH NEXT <get-count> ROWS ONLY) ORDER BY RECVDATE,NEWSITEMID" ,
//relation article template
"ARTICLE_RELATIONS" : ["SELECT * FROM (\
    SELECT \
                NEWSITEM.NEWSITEMID,\
                NEWSITEM.RECVDATE, \
                NEWSITEM.HEADLINE, \
                NEWSITEM.SYUKKONO, \
                NEWSITEM.PARTSYUKKONO, \
                NEWSITEM.SMALLCLASS, \
                NEWSITEM.OPERATIONDATE,  \
                NEWSITEM.SUBHEADER, \
                NEWSITEM.GENRECD, \
                NEWSITEM.JACSNO, \
                NEWSITEM.EMBARGO,\
                NEWSITEM.REPLACEMENTCOUNT,\
                NEWSITEM.JACSENTRYINDICATE,\
                SENDSTATUSSUM.NEWESTOUTPUTID \
    FROM  CONTENTSLINKINFO \
    LEFT JOIN \
    NEWSITEM \
    ON  \
               CONTENTSLINKINFO.NEWSITEMID_TO = NEWSITEM.NEWSITEMID \
    WHERE CONTENTSLINKINFO.NEWSITEMID_FROM = '<content-id>' \
    AND   CONTENTSLINKINFO.LINK_PATTERN = 'C'\
    AND NEWSITEM.OPENSTATUSFLG = '0'  AND NEWSITEM.NEWESTITEMFLG = '0'\
    INNER JOIN \
    SENDSTATUSSUM\
    ON \
    SENDSTATUSSUM.NEWSITEMID = CONTENTSLINKINFO.NEWSITEMID_TO\
    WHERE SENDSTATUSSUM.TERMINALUSER =  '<terminal-user>' )T1\
    WHERE <permissionCondition>", 
    "SELECT * FROM (\
        SELECT \
                    PGFNEWSITEM.NEWSITEMID, \
                    PGFNEWSITEM.RECVDATE, \
                    PGFNEWSITEM.HEADLINE, \
                    PGFNEWSITEM.SUBHEADER, \
                    PGFNEWSITEM.FILEPATH, \
                    PGFNEWSITEM.PHTOPIC, \
                    PGFNEWSITEM.CAPTION,\
                    PGFNEWSITEM.SYUKKONO,\
                    PGFNEWSITEM.PARTSYUKKONO,\
                    PGFNEWSITEM.GENRECD,\
        FROM  CONTENTSLINKINFO\
        LEFT JOIN \
        PGFNEWSITEM \
        ON \
                        CONTENTSLINKINFO.NEWSITEMID_TO = PGFNEWSITEM.NEWSITEMID \
        WHERE  WHERE   CONTENTSLINKINFO.NEWSITEMID_FROM = '<content-id>'\
        AND  CONTENTSLINKINFO.LINK_PATTERN = 'C' \
        AND  PGFNEWSITEM.FEATURE_PDFKIND = 'NULL'\
        AND PGFNEWSITEM.OPENSTATUSFLG = '0'  AND PGFNEWSITEM.NEWESTITEMFLG = '0')T1\
        WHERE <permissionCondition>",
     "SELECT * FROM (\
        SELECT \
                    PGFNEWSITEM.NEWSITEMID, \
        FROM  CONTENTSLINKINFO\
        LEFT JOIN \
        PGFNEWSITEM,\
        ON \
                        CONTENTSLINKINFO.NEWSITEMID_TO = PGFNEWSITEM.NEWSITEMID \
        WHERE   CONTENTSLINKINFO.NEWSITEMID_FROM = '<content-id>'\
        AND   CONTENTSLINKINFO.LINK_PATTERN = 'C'\
        AND  PGFNEWSITEM.FEATURE_PDFKIND = 'B'\
        AND PGFNEWSITEM.OPENSTATUSFLG = '0'  AND PGFNEWSITEM.NEWESTITEMFLG = '0')T1\
        WHERE <permissionCondition>"],
        // Permisstion condtions
        "PERMISSTION_CONDTIONS": "NOT EXISTS ( \
            SELECT 1 \
              FROM DUAL \
             WHERE SPECIALLY = '2' \
               AND NOT EXISTS ( \
                SELECT 1 \
                  FROM ( \
                    SELECT USECOID \
                         , USECOCD \
                         , USECOCD || '%' USECOCDLIKE \
                      FROM SETUSECO_A  \
                     WHERE USECOID = '<usecoid>' \
                       ) T3 \
                 WHERE T1.SENDTO LIKE T3.USECOCDLIKE \
               ) \
            UNION ALL \
            SELECT 1 \
              FROM DUAL \
             WHERE SPECIALLY = '9' \
               AND EXISTS ( \
                SELECT 1 \
                  FROM ( \
                    SELECT USECOID \
                         , USECOCD \
                         , USECOCD || '%' USECOCDLIKE \
                      FROM SETUSECO_A  \
                     WHERE USECOID = '<usecoid>' \
                       ) T3 \
                     , CLOSESENDTO T4 \
                 WHERE T4.NEWSITEMID = T1.NEWSITEMID \
                   AND T4.USECOCD    LIKE T3.USECOCDLIKE \
               ) \
            UNION ALL \
            SELECT 1 \
              FROM ( \
                SELECT USECOID \
                     , SZKBN \
                     , SAVECLASS \
                     , REPLACE(GENRECD,'*','%') GENRECD \
                     , SYUKKONONOT \
                     , SYUKKONOFROM \
                     , SYUKKONOTO \
                     , SMALLCLASS \
                     , FORMATCLASS \
                     , REPLACE(MACHCLASS,'*','%') MACHCLASS \
                     , REPLACE(MACHCLASSDETAIL,'*','%') MACHCLASSDETAIL \
                     , FLASHCLASS \
                     , SHUBETSU \
                     , SHUBETSUNOT \
                     , BKNUMKBN \
                     , TEIKEIKBN \
                  FROM SETNOSEARCHCONDITION_A \
                 WHERE USECOID = '<usecoid>' \
                   AND ( NOSEARCHOBJECT = '1' OR ( NOSEARCHOBJECT = '2' AND NOOUTPUTID = '<outputid>' ) ) \
                   ) T2 \
             WHERE (T1.SZKBN           IS NULL OR T2.SZKBN           IS NULL OR T1.SZKBN           = T2.SZKBN) \
               AND (T1.SAVECLASS       IS NULL OR T2.SAVECLASS       IS NULL OR T1.SAVECLASS       = T2.SAVECLASS) \
               AND (T1.SMALLCLASS      IS NULL OR T2.SMALLCLASS      IS NULL OR T1.SMALLCLASS      = T2.SMALLCLASS) \
               AND (T1.FORMATCLASS     IS NULL OR T2.FORMATCLASS     IS NULL OR T1.FORMATCLASS     = T2.FORMATCLASS) \
               AND (T1.FLASHCLASS      IS NULL OR T2.FLASHCLASS      IS NULL OR T1.FLASHCLASS      = T2.FLASHCLASS) \
               AND (T1.SPORTSITEMCLASS IS NULL OR T2.TEIKEIKBN       IS NULL OR T1.SPORTSITEMCLASS = T2.TEIKEIKBN) \
               AND (T1.GENRECD         IS NULL OR T2.GENRECD         IS NULL OR T1.GENRECD         LIKE T2.GENRECD) \
               AND (T1.MACHCLASS       IS NULL OR T2.MACHCLASS       IS NULL OR T1.MACHCLASS       LIKE T2.MACHCLASS) \
               AND (T1.MACHCLASSDETAIL IS NULL OR T2.MACHCLASSDETAIL IS NULL OR T1.MACHCLASSDETAIL LIKE T2.MACHCLASSDETAIL) \
               AND (T2.BKNUMKBN     IS NULL OR (T2.BKNUMKBN = '0' AND TO_NUMBER(T1.SENDSEQTOTAL) = 0) OR (T2.BKNUMKBN = '9' AND TO_NUMBER(T1.SENDSEQTOTAL) <> 0)) \
               AND ( \
                 (T2.SHUBETSU IS NULL OR T1.SHUBETSU IS NULL OR T2.SHUBETSUNOT IS NULL) \
              OR (T2.SHUBETSUNOT = '0' AND T2.SHUBETSU =  T1.SHUBETSU) \
              OR (T2.SHUBETSUNOT = '1' AND T2.SHUBETSU <> T1.SHUBETSU) \
               ) \
               AND ( \
                 (T2.SYUKKONONOT = '0' AND (T1.SYUKKONO     BETWEEN NVL(LPAD( T2.SYUKKONOFROM, LENGTH(T1.SYUKKONO), '0'),'----') AND NVL(LPAD( T2.SYUKKONOTO, LENGTH(T1.SYUKKONO), '0'),'ZZZZ'))) \
              OR (T2.SYUKKONONOT = '1' AND (T1.SYUKKONO NOT BETWEEN NVL(LPAD( T2.SYUKKONOFROM, LENGTH(T1.SYUKKONO), '0'),'----') AND NVL(LPAD( T2.SYUKKONOTO, LENGTH(T1.SYUKKONO), '0'),'ZZZZ'))) \
               ) \
        )"
});