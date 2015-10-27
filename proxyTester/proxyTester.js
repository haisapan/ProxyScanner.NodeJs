var request = require("request");
var Q = require("q");
var desUrl ="https://www.google.com.hk/#safe=strict&q=test";//"http://google.com.hk";"http://www.baidu.com"//


var testProxy = function (proxy) {
	var proxyRequest = request.defaults({
		proxy:  "http://" + proxy.Ip + ":" + proxy.Port, //"http://113.126.171.238:80", //
		 maxSockets:Infinity,
		 pool: {maxSockets: Infinity},
		timeout: 120000,
		time: true
	});
	
	proxyRequest({
		url: desUrl + "?r=" + Math.random(),
		headers: {
			'User-Agent': 'request'
		}
	},function(err, result, body){
		if(err) return;// console.error(err);
		if (result.statusCode == 200 || result.statusCode == 502) {  //I add 502 here because sometime it work
				proxy.isValid = true;
				proxy.speedTime = result.elapsedTime;
				console.log("Proxy Valid:  %s:%s in %s, rate is:%s", proxy.Ip, proxy.Port, proxy.Place, proxy.speedTime);
		}
				//return [proxy];
	})
	
return;
	var q = Q.denodeify(proxyRequest);
	console.log(new Date());
	 q({
		url: desUrl + "?r=" + Math.random(),
		headers: {
			'User-Agent': 'request'
		}
	})
		.then(function (result) {
			if (result[0].statusCode == 200 || result[0].statusCode == 502) {  //I add 502 here because sometime it work
				proxy.isValid = true;
				proxy.speedTime = result[0].elapsedTime;
				console.log("Proxy Valid:  %s:%s in %s, rate is:%s", proxy.Ip, proxy.Port, proxy.Place, proxy.speedTime);
				//return [proxy];
			}
			//return null;

		}).catch(function (err) {
			//console.error(err);
		})
	// .spread(function(validProxy){
	// 	//console.log(validProxy);
	// })
	// .catch(function (err) {
	// 	console.error(err);
	// });
}

exports.testProxy = testProxy;
