var media_parser = require('media-parser');

function getLocalStorage(firstValue){
	if (typeof localStorage === "undefined" || localStorage === null) 
	{
		var LocalStorage = require('node-localstorage').LocalStorage;
		localStorage = new LocalStorage('./scratch');
	}
	localStorage.setItem('myFirstKey', 'myFirstValue');
	return localStorage;
}
exports.getLocalStorage = getLocalStorage;


function getMediaInfo(raw, cb){
	media_parser.parse(raw, function(obj) { 
		return cb(obj);
	});
}

exports.getMediaInfo = getMediaInfo;

function renderMedia(raw, cb){
	media_parser.parse(raw, function(obj) { 
		console.log(obj);
		var id = obj.raw.thumbnail_url.split("/");
		
		var html = '<div class="media_wrapper" data-id="'+id[4]+'">';
			html += '<div class="ico_play"></div>'
			html += '<div class="thumbnail" style="background-image:url('+obj.raw.thumbnail_url+')"></div>'
			html += '</div>';
			return cb(html);
	});
}

exports.renderMedia = renderMedia;