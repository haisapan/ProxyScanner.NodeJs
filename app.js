var Promise = require("bluebird");

var Scanner = require("./proxyScanner/xiciScanner.js");
var tester = require("./proxyTester/proxyTester.js");

var desUrl = process.argv[2] || "http://www.google.com.hk";  ////var desUrl ="https://github.com/";

console.log("----start to connect the url: " + desUrl);

var scanner = new Scanner();

scanner.startScan().then(function (result) {
	var res = result[0];
	if (res.statusCode == 200) {
		var ipList = scanner.parseHtml(res.body);

		var allTestPromises = [];

		var validIpList = [];
		for (var i = 0; i < ipList.length; i++) {

			var proxyHandler = tester.testProxy(ipList[i], desUrl);
			allTestPromises.push(proxyHandler);
			(function(proxy) {
				proxyHandler.then(function (result) {
					if (result[0].statusCode == 200) { // || result[0].statusCode == 502
						proxy.isValid = true;
						proxy.speedTime = result[0].elapsedTime;
						console.log("Proxy Valid:  %s:%s in %s, rate is:%s", proxy.Ip, proxy.Port, proxy.Place, proxy.speedTime);
						validIpList.push(proxy);

					}
				}).catch(function (err) {
					// console.error(err);
				});

			}) (ipList[i]);


			// if (i >= 80) {
			// 	break;
			// }
		}


		Promise.settle(allTestPromises).then(function (results) {
			console.log("have find all the valid proxy!");
			// console.log(validIpList);
			
		}).catch(function (err) {
			console.log(err)
		});




	}

});

