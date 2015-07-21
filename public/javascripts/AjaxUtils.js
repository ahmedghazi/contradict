var AjaxUtils = function(){
	var _this = this,
		user_id = 1;

	this.init = function(){
		
		_this.bindEvents();
_this.reorderReplies();
		setTimeout(function(){
			
		}, 400);
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
					$("#rate-"+_data.id).children(".up").children(".count").text(d.vote_up);
					$("#"+_data.id).data("vote_up",d.vote_up);
				}else{
					$("#rate-"+_data.id).children(".down").children(".count").text(d.vote_down);
					$("#"+_data.id).data("vote_down",d.vote_down);
				}

				_this.reorderReplies();
			}
		})
	};

	this.reorderReplies = function(){
		$wrapper = $(".replies_liste");
		$ordered = $wrapper.find('.reply').sort(function (a, b) {
			var da = $(a).data();
			var db = $(b).data();
		    return db.vote_up - da.vote_up;
		})
		
		var top = 0;
		$ordered.each(function(idx,el){
			//console.log($(el).data("vote_up"));
			$(el).animate({top:top+"px"});
			top += $(el).height() + 10;
		});
		top -= 10;
		$wrapper.css({height:top})
	};

	this.getSorted = function(selector, attrName) {
	    $(selector).sort(function (a, b) {
//console.log($(a).attr('data-'+attrName),$(b).attr('data-'+attrName))
	      var contentA =parseInt( $(a).attr('data-'+attrName));
	      var contentB =parseInt( $(b).attr('data-'+attrName));
	      return (contentA < contentB) ? -1 : (contentA > contentB) ? 1 : 0;
	   })
	}
}