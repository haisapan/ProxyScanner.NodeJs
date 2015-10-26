var telnet=require("telnet-client");
var client=new telnet();

var params={
	 host: '123.194.186.55',
	port: 8888,
	shellPrompt: '/ # ',
	timeout: 5500,
	// removeEcho: 4
}

client.on("ready", function(prompt){
	client.exec(cmd, function(response){
		console.info(response);	
	});
});

client.on("timeout",function(){
	console.error("socket timeout");
	client.end();
});

client.on("close",function(){
	console.log("connection closed");
})

client.on("error",function(err){
	console.error(err);
})

client.connect(params);