/*eslint no-console: 0, no-unused-vars: 0, dot-notation: 0*/
"use strict";

var conn = $.hdb.getConnection();
var query = "SELECT FROM PurchaseOrder.Item { " +
	        " PURCHASEORDERID as \"PurchaseOrderItemId\", " +
            " PURCHASEORDERITEM as \"ItemPos\", " +
            " PRODUCT as \"ProductID\", " +
            " GROSSAMOUNT as \"Amount\" " +
            " } ";
var rs = conn.executeQuery(query);

var body = "";

for(var i = 0; i < rs.length; i++){
   if(rs[i]["Amount"] >= 500){
	body += rs[i]["PurchaseOrderItemId"] + "\t" + rs[i]["ItemPos"] + "\t" + 
			rs[i]["ProductID"] + "\t" + rs[i]["Amount"] + "\n";
   }
}


$.response.setBody(body);
$.response.contentType = "application/vnd.ms-excel; charset=utf-16le";
$.response.headers.set("Content-Disposition",
		"attachment; filename=Excel.xls");
$.response.status = $.net.http.OK;

/**This logic reads data from our
item table, formats it as text
table delimited and then sends
it out in a way that the browser
will treat it as an Excel
download.*/