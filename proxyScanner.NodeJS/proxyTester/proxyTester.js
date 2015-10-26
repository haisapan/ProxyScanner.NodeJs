var request=require("request");
var desUrl="http://google.com.hk";


var testProxy=function(proxy){
	var proxyRequest=request.defaults({
		proxy:"http://"+proxy.Ip+":"+proxy.Port
	});
	proxyRequest(desUrl,function(err, res){
		if(err){
			return console.error(err);  //only when develop
		}
		//console.log(res);
		if(res.statusCode==200){
			proxy.isValid=true;
			console.log("Proxy Valid:  %s:%s in %s",proxy.Ip,proxy.Port, proxy.Place);
		}
		
		//return true;
		//todo need some way to get the speed 
	})
}

exports.testProxy=testProxy;
