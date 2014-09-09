var AjaxUtils = function(){
	var _this = this,
		user_id = 1;

	this.init = function(){
		_this.bindEvents();
	};

	this.bindEvents = function(){
		$(".story .up").on("click", function(){
			var data = {};
				data.url = '/api/v',
				data.action = 'vote_up',
				data.id = $(this).parents(".module_rate").attr("id").split("-")[1],
				data.user_id = user_id;
			_this.vote(data);
		});

		$(".story .down").on("click", function(){
			var data = {};
				data.url = '/api/v',
				data.action = 'vote_down',
				data.id = $(this).parents(".module_rate").attr("id").split("-")[1],
				data.user_id = user_id;
			_this.vote(data); 
		});

		$(".reply .up").on("click", function(){
			var data = {};
				data.url = '/api/vr',
				data.action = 'vote_up',
				data.id = $(this).parent().attr("id").split("-")[1],
				data.user_id = user_id;
			_this.vote(data);
		});

		$(".reply .down").on("click", function(){
			var data = {};
				data.url = '/api/vr',
				data.action = 'vote_down',
				data.id = $(this).parent().attr("id").split("-")[1],
				data.user_id = user_id;
			_this.vote(data); 
		});
	};

	this.vote = function(_data){
		$.ajax({
			url:_data.url,
			type:"POST",
			data:_data,
			success:function(d,t,j){
				//console.log(d.vote_up,d.vote_down);
				if(_data.action == 'vote_up'){
					$("#rate-"+_data.id).children(".up").children(".count").text(d.vote_up)
				}else{
					$("#rate-"+_data.id).children(".down").children(".count").text(d.vote_down)
				}
			}
		})
	};
}