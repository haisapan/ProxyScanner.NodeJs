var request = require("request");
var cheerio = require("cheerio");

var Promise=require("bluebird");

var xiciProxySite =  "http://www.xicidaili.com/nt/1";

var scanner = function () {

};

scanner.prototype.startScan = function () {
	return this.scanUrl(xiciProxySite);
}

scanner.prototype.scanUrl = function (url) {
	var that = this;
	var p=Promise.promisify(request);
	
	return p({
			url: url,
			method: "GET",
			headers: { //make the scanner to be bowerser
				'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; WOW64; Trident/7.0; rv:11.0) like Gecko'  //this is make the scanner to be a webbrowers
			}
		});

};

scanner.prototype.parseHtml = function (html) {
	var $ = cheerio.load(html);
	var ipList = [];
	$("#ip_list tr").each(function (index, item) {
		if (index > 0) {
			//console.log($(this).html());
			var ipItem={};
			ipItem.Ip=$(this).find("td").eq(2).text();
			ipItem.Port=$(this).find("td").eq(3).text();
			ipItem.Place=$(this).find("td").eq(4).find("a").text();
			ipItem.Type=$(this).find("td").eq(5).text();
			ipItem.Protal=$(this).find("td").eq(6).text();
			ipList.push(ipItem);
			
		}

	});

	return ipList;
}

module.exports = scanner;

