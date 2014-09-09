var FormUtils = function(){
	var _this = this;

	this.init = function(){
		_this.bindEvents();
	};

	this.bindEvents = function(){
		$("textarea")
			.on("focusin", function(e){
				if($(this).val() == "Your story")$(this).val("");
			}).on("focusout", function(e){
				if($(this).val() == "")$(this).val("Your story");
			});

	};
}