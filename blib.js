//var links = {"bookmark1" : [{"title" : "Google", "href" : "www.google.com"}, {"title" : "Yahoo", "href" : "http://www.yahoo.com"}, {"title" : "Google", "href" : "www.google.com"},{"title" : "Google", "href" : "https://www.google.com"}]}
var links = {"bookmark" : [ { "href" : "foo://example.com:8042/over/there?name=ferret#nose" }, { "href" : "urn:example:animal:ferret:nose" }, { "href" : "http://pages.cs.wisc.edu/~bart/537/lecturenotes/titlepage.html"}, { "href" : "http://www.mit.edu/afs/athena.mit.edu/project/gnu/"}, { "href" : "http://web.cecs.pdx.edu/~bjorn/CS200/linux_tutorial/"}, { "href" : "http://www.yolinux.com/TUTORIALS/LibraryArchives-StaticAndDynamic.html"}, { "href" : "http://www.crasseux.com/books/ctutorial/"}, { "href" : "http://www.crasseux.com/books/ctutorial/"}, { "href" : "http://viralpatel.net/taj/tutorial/hello_world_bootloader.php"}, { "href" : "http://en.wikipedia.org/wiki/URI_scheme#Generic_syntax" }, { "href" : "http://tools.ietf.org/html/rfc3986#section-2" }, { "href" : "https://www.google.com/search?q=regex+zero+or+one&oq=regex+zero+&aqs=chrome.2.57j0l3j62l2.12170j0&sourceid=chrome&ie=UTF-8" }, {"href" : "magnet:?xt=urn:btih:e9ad6d053226a2e60f10505a806f7b9083fd32aa&dn=Jack.the.Giant.Slayer.2013.BRRip.XviD-S4A&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&tr=udp%3A%2F%2Ftracker.publicbt.com%3A80&tr=udp%3A%2F%2Ftracker.istole.it%3A6969&tr=udp%3A%2F%2Ftracker.ccc.de%3A80&tr=udp%3A%2F%2Fopen.demonii.com%3A1337"} ]} 

function sameLink (link1, link2) {
	if (link1.href == link2.href)
		return ture;
	return false;
}

hashCode = function(str){
	var hash = 0;
	if (str.length == 0) return hash;
	for (i = 0; i < str.length; i++) {
		char = str.charCodeAt(i);
		hash = ((hash<<5)-hash) + char;
		hash = hash & hash; // Convert to 32bit integer
	}
	return hash;
}

/*
* Rules for factorization have been taken from the following references:
* http://en.wikipedia.org/wiki/URI_scheme#Generic_syntax
* http://tools.ietf.org/html/rfc3986#section-2
*/
factorizeLink = function(links){
	var URLs = new Array();
	for (var i = 0, len = links.length; i !== len; i++) {
		schemaRegex = new RegExp("(.*?):(.*)?$");
		authorityRegex = new RegExp("//(.*?)(/.*)?$");
		pathRegex = new RegExp('/?(.*?)(\\?.*)?$');
		queryRegex = new RegExp('\\?(.*?)(#.*)?$');
		fragmentRegex = new RegExp('#(.*?)$');
		var url = new Object();
		url.schema = null;
		url.authority = null;
		url.path = null;
		url.query = null;
		url.fragment = null;
		var restUrl = links[i].href;
		var regexResult = null;
		/*
		* Get schema, if present in the bookmarked URL
		*/
		if(schemaRegex.test(restUrl)){
			regexResult = schemaRegex.exec(restUrl);
			url.schema = regexResult[1];
			restUrl = regexResult[2];
		}
		/*
		* Get authority part, if present in the URL
		*/
		if(authorityRegex.test(restUrl)){
			regexResult = authorityRegex.exec(restUrl);
			url.authority = regexResult[1];
			restUrl = regexResult[2];
		}
		/*
		* Get path, if present in URL
		*/
		if(pathRegex.test(restUrl)){
			regexResult = pathRegex.exec(restUrl);
			url.path = regexResult[1];
			restUrl = regexResult[2];
		}
		/*
		* Get query, if present in URL
		*/
		if(queryRegex.test(restUrl)){
			regexResult = queryRegex.exec(restUrl);
			url.query = regexResult[1];
			restUrl = regexResult[2];
		}
		/*
		* Get query, if present in URL
		*/
		if(fragmentRegex.test(restUrl)){
			regexResult = fragmentRegex.exec(restUrl);
			url.fragment = regexResult[1];
		}
		URLs[i] = url;
	}
	return URLs;
}

sanitizeLink = function(link) {
	return link;
}

linkToHash = function(link) {
	return hashCode(sanitizeLink(link));
}

uniqueLinks = function(links) {
	var newLinks = {};
	for (var i = 0, len = links.length; i !== len; i++) {
		linkHashCode = linkToHash(links[i].href);
		if (!newLinks[linkHashCode]) {
			newLinks[linkHashCode] = links[i];
		}
	}
	return newLinks;
}

console.log(factorizeLink(links["bookmark"]));
console.log(uniqueLinks(links["bookmark"]));