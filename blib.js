var links = {"bookmark1" : [{"title" : "Google", "href" : "www.google.com"}, {"title" : "Yahoo", "href" : "www.yahoo.com"}, {"title" : "Google", "href" : "www.google.com"}]}

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

console.log(uniqueLinks(links["bookmark1"]))