var Scanner = require("./proxyScanner/xiciScanner.js");

var scanner = new Scanner();
scanner.startScan().then(function (result) {
	var res = result[0];
	if (res.statusCode == 200) {
		var ipList = scanner.parseHtml(res.body);

		for (var i = 0; i < ipList.length; i++) {

			tester.testProxy(ipList[i]);
			if (i >= 20) {
				break;
			}

		}
	}

});

var tester = require("./proxyTester/proxyTester.js");

function test(ipList) {
	console.log("....start to test ips");
	for (var i = 0; i < ipList.length; i++) {

		tester.testProxy(ipList[i]);
		if (i >= 20) {
			break;
		}

	}
}