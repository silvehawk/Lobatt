// var url = "http://87.138.73.49:8081/datasnap/rest/ZEEXRest/getTime/";
//
// function httpGet(url) {
	// var xmlHttp = null;
	// xmlHttp = new XMLHttpRequest();
	// xmlHttp.open("GET",url,false);
	// xmlHttp.send(null);
	// return xmlHttp.responseText;
// }
//
// console.log(httpGet(url));

// $.ajax({
	// // http://87.138.73.49:8081/datasnap/rest/ZEEXRest/getTime/
	// url : "http://87.138.73.49:8081/datasnap/rest/ZEEXRest/getTime/",
	// timeout : 3000,
	// dataType: "jsonp",
	// success : function(response) {
		// $(".rest-data").append("<li>" + response);
	// },
	// error : function() {
		// $(".rest-data").append("<li>Not able to load Data");
	// }
// });

// $.get("http://87.138.73.49:8081/datasnap/rest/ZEEXRest/getTime/", null, function(response) {
// console.log(response);
// });

// $(document).ready(function() {
// $(".rest-data").append("<li>Loading data...");
// $.jsonp({
// url : "http://87.138.73.49:8081/datasnap/rest/ZEEXRest/getTime/",
// callbackParameter : "callback",
// timeout : 3000,
// success : function(data, status) {
// // $.each(data, function(i, item) {
// // var restAnswer = item.text;
// $(".rest-data").append("<li>" + data);
// // });
// },
// error : function() {
// $(".rest-data").append("<li>Not able to load Data");
// }
// });
// });