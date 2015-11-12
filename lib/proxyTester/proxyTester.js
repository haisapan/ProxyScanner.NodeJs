var request = require("request");
var Promise = require("bluebird");


var testProxy = function (proxy, desUrl) {
	var proxyRequest = request.defaults({
		proxy: "http://" + proxy.Ip + ":" + proxy.Port, //"http:// 60.29.248.142:8080",
		maxSockets: Infinity,
		pool: { maxSockets: Infinity },
		timeout: 20000,
		time: true
	});

	var pRequest = Promise.promisify(proxyRequest);
	return pRequest({
		url: desUrl + "?r=" + Math.random(),
		headers: {
			'User-Agent': 'request'
		}
	});

}

exports.testProxy = testProxy;
