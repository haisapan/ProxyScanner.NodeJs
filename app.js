
var cp=require("child_process");
var tester=require("./proxyTester/proxyTester.js");

var Q = require("q");
var Scanner = require("./proxyScanner/xiciScanner.js");

var scanner = new Scanner();
scanner.startScan().then(function (result) {
	var res = result[0];
	if (res.statusCode == 200) {
		var ipList = scanner.parseHtml(res.body);

       var allTestPromises=[];
		for (var i = 0; i < ipList.length; i++) {

			// var child=cp.fork("./proxyTester/proxyTester.js",[ipList[i]]); //,[ipList[i]]
			// child.on("message", function(m){
			// 	console.log(m);
			// })
			// child.send(ipList[i]);

			var proxyHandler= tester.testProxy(ipList[i]);
			// allTestPromises.push(proxyHandler);
			if (i >= 90) {
				break;
			}
		}
		
		
	}

});

