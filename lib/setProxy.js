
var exec = require('child_process').exec;

exports.disableProxyInWin=function() {
	var command = 'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings" /v ProxyEnable /t REG_DWORD /d 0 /f';
	executeCommand(command);
}

exports.enableProxyInWin=function() {
	var command = 'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings" /v ProxyEnable /t REG_DWORD /d 1 /f';
	console.log("enableProxyInWin")
	executeCommand(command);
}

exports.changeProxyInWin=function(proxy) {
	var command = 'reg add "HKCU\\Software\\Microsoft\\Windows\\CurrentVersion\\Internet Settings"  /v ProxyServer  /d ' + proxy.Ip + ':' + proxy.Port + ' /f';
	console.log("changeProxyInWin")
	executeCommand(command);
}

exports.changeProxyAndEnableInWin=function(proxy) {
	exports.changeProxyInWin(proxy);
	exports.enableProxyInWin();
}

function executeCommand(command) {
	var child = exec(command, function (err, stdout, stderr) {
		if (err) throw err;
		console.log("-----exec successfully!");
	});
	// child.stdout.on('data', function (data) {
	// 	if (data.indexOf("\n") > 0) {
	// 		data = data.substring(0, data.toString().indexOf("\n"))  //remove unused new line
	// 	}
	// 	console.log(data);
	// });
	child.on("exit", function (code, signal) {
		// console.log("exit child");
	});
}

