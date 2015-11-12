var Promise = require("bluebird");

var Scanner = require("./lib/proxyScanner/xiciScanner.js");
var tester = require("./lib/proxyTester/proxyTester.js");

var desUrl = process.argv[2] || "https://www.google.com.hk";  ////var desUrl ="https://github.com/";
var scanPageNumers = process.argv[3] || 9;  //scan xici numbers

startScan();  //main start

function startScan() {
	console.log("----start to connect the url: " + desUrl);

	var scanner = new Scanner();
	scanner.startMultiScan(scanPageNumers).then(function (results) {  //Start to scan 9 pages to get more proxy
		var allIPs = [];
		for (var i = 0; i < results.length; i++) {
			var result = results[i];
			allIPs = allIPs.concat(result);
		}

		testMultiIps(allIPs);
	});
}



function testMultiIps(ipList) {
	var allTestPromises = [];
	var validIpList = [];
	for (var i = 0; i < ipList.length; i++) {
		if (!ipList[i]) {
			continue;
		}
		var proxyHandler = tester.testProxy(ipList[i], desUrl);
		allTestPromises.push(proxyHandler);
		(function (proxy) {
			proxyHandler.then(function (result) {
				if (result[0].statusCode == 200) { // || result[0].statusCode == 502
					proxy.isValid = true;
					proxy.speedTime = result[0].elapsedTime;
					console.log("Proxy Valid:  %s:%s in %s, rate is:%s", proxy.Ip, proxy.Port, proxy.Place, proxy.speedTime);
					validIpList.push(proxy);

				}
			}).catch(function (err) {

			});

		})(ipList[i]);


		// if (i >= 80) {
		// 	break;
		// }
	}


	Promise.settle(allTestPromises).then(function (results) {
		console.log("----have find all the valid proxy!");
		// console.log(validIpList);
		process.exit();
			
	}).catch(function (err) {
		console.log(err)
		process.exit();
	});
}

