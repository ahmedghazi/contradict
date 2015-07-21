var ww,wh,fu,vu,au,prev_st;

jQuery(document).ready(function ($) {
	format();
	
});

$(window).resize(function(){ 
	format();
});

$(window).load(function(){ 
	$("#wrapper").removeClass("hidden");
	init();
});



function init(){
	init_objects();
}

function init_objects(){
	fu = new FormUtils();
	fu.init();

	vu = new ViewUtils();
	vu.init();

	au = new AjaxUtils();
	au.init();
}

function format(){
	ww = $(window).width();
	wh = $(window).height();

	var padding = 40;
	var inner_w = $(window).width() - 40;
	$("header,footer").css({width:inner_w});

	var w1 = (ww - padding);
	$(".liste article").css({width:w1});
	$(".liste .article_inner").css({width:w1-67});


	var w12 = (ww - padding) / 2 - 67;
	$(".post .article_inner").css({width:w12});

	$(".replies").css({width:w12+57});

	var rinner = w12-11;
	$(".reply_inner").css({width:rinner});
}