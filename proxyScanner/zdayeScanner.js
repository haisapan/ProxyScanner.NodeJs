var request = require("request");
var cheerio = require("cheerio");

var xiciProxySite = "http://ip.zdaye.com/?adr=%CC%A8%CD%E5";// "http://www.xicidaili.com/nt/1";

var scanner = function () {

};

scanner.prototype.startScan = function (callback) {
	this.scanUrl(xiciProxySite, callback);
}

scanner.prototype.scanUrl = function (url, callback) {
	var that = this;
	request(
		{
			url: url,
			method: "GET",
			headers: { //浏览器伪装
				'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64; Trident/7.0; rv:11.0) like Gecko'  //this is make the scanner to be a webbrowers
			}
		}
		, function (err, res, body) {
			if (!err && res.statusCode == 200) {
				//console.log(body);
				var iplist=that.parseHtml(body);
				callback(iplist);
			}
		}
		)
};

scanner.prototype.parseHtml = function (html) {
	var $ = cheerio.load(html);
	var ipList = [];
	$("#ip_list tr").each(function (index, item) {
		if (index > 0) {
			console.log($(this).html());
			var ipItem={};
			ipItem.Ip=$(this).find("td").eq(2).text();
			ipItem.Port=$(this).find("td").eq(3).text();
			ipItem.Place=$(this).find("td").eq(4).find("a").text();
			ipItem.Type=$(this).find("td").eq(5).text();
			ipItem.Protal=$(this).find("td").eq(6).text();
			ipList.push(ipItem);
			
		}

	});
	
	console.log(ipList);
	return ipList;
}

module.exports = scanner;

