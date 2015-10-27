
var Q = require("q");
var Scanner = require("./proxyScanner/xiciScanner.js");

var scanner = new Scanner();
scanner.startScan().then(function (result) {
	var res = result[0];
	if (res.statusCode == 200) {
		var ipList = scanner.parseHtml(res.body);

       var allTestPromises=[];
		for (var i = 0; i < ipList.length; i++) {

			var proxyHandler= tester.testProxy(ipList[i]);
			allTestPromises.push(proxyHandler);
			if (i >= 80) {
				break;
			}
		}
		// Q.allSettled(allTestPromises).then(function(result, data){
		// 	//end test
		// 	result.forEach(function(element) {
		// 		//console.log(element);
		// 		if(element.state!="rejected"){
		// 			// console.log(element);
		// 			console.log(element.value[0]);
		// 		}
		// 	}, this)
		// 	.catch(function(err){
		// 		console.error(err);
		// 	});
		// 	//console.log(result);
		// });
		
	}

});

var tester = require("./proxyTester/proxyTester.js");

// function test(ipList) {
// 	console.log("....start to test ips");
// 	for (var i = 0; i < ipList.length; i++) {

// 		tester.testProxy(ipList[i]);
// 		if (i >= 20) {
// 			break;
// 		}

// 	}
// }