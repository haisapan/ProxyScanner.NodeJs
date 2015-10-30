
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
	   ipList=[{Ip:"121.15.171.70",Port:3128},{ Ip:"124.131.221.142",Port:9999},{ Ip:"111.11.255.11",Port:80}]
		for (var i = 0; i < ipList.length; i++) {
// console.log(ipList[i]);

			// var child=cp.fork("./proxyTester/proxyTester.js",[ipList[i]]); //,[ipList[i]]
			// child.on("message", function(data){
			// 	console.log("main app receive child process message:")
			// 	console.log(JSON.stringify(data));
			// })
			// child.send(ipList[i]);

			var proxyHandler= tester.testProxy(ipList[i]);
			// allTestPromises.push(proxyHandler);
			if (i >= 30) {
				break;
			}
		}
		
		
	}

});

