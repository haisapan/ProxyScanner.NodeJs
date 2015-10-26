var Scanner=require("./proxyScanner/xiciScanner.js");

var scanner=new Scanner();
scanner.startScan(test);

var tester=require("./proxyTester/proxyTester.js");

function test(ipList){
	console.log("....start to test ips");
	for (var i = 0; i < ipList.length; i++) {
		
		tester.testProxy(ipList[i]);
		if(i>=20){
			break;
		}
		
	}
}