var ViewUtils = function(){
	var _this = this,
		prev_st = 0;

	this.init = function(){
		_this.bindEvents();
	};

	this.bindEvents = function(){
		$(window).scroll(function(){ 
			_this.handleScroll();
			if($(window).scrollTop() == $(document).height() - $(window).height()){
			    //if(!isLoading)get_new_images();
			}
		});
	};

	this.handleScroll = function(){
		if($(window).scrollTop() < prev_st){
			console.log("haut")
			$("footer").removeClass("offside_bottom");
			$("header").addClass("offside_top");
		}else{
			console.log("bas");
			$("footer").addClass("offside_bottom");
			$("header").removeClass("offside_top");
		}

		if($(window).scrollTop() == $(document).height() - $(window).height())$("footer").removeClass("offside_bottom");
		if($(window).scrollTop() == 0)$("header").removeClass("offside_top");
		if($(window).scrollTop() > 0){
			$(".post .story").addClass("affix");
			$(".post .replies").css({float:"right"});
		}else{
			$(".post .story").removeClass("affix");
			$(".post .replies").css({float:"none"});
		}
		prev_st = $(window).scrollTop();
	};

	this.parseContent = function(c){
        return c;
    };
}