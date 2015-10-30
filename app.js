var Q = require("q");
var Scanner = require("./proxyScanner/xiciScanner.js");
var tester=require("./proxyTester/proxyTester.js");

var desUrl=process.argv[2]||"http://www.google.com.hk";  ////var desUrl ="https://github.com/";

console.log("----start to connect the url: "+desUrl);

var scanner = new Scanner();
scanner.startScan().then(function (result) {
	var res = result[0];
	if (res.statusCode == 200) {
		var ipList = scanner.parseHtml(res.body);

       var allTestPromises=[];
		for (var i = 0; i < ipList.length; i++) {
			var proxyHandler= tester.testProxy(ipList[i],desUrl);
			// allTestPromises.push(proxyHandler);
			if (i >= 30) {
				break;
			}
		}
		
		
	}

});

