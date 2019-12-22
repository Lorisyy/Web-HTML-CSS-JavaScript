/*
*宿永烨 
*18342107
*/
var stop = 0;
var array = new Array(6);
var sum = 0;
var html = $.get("/get", function(req){});

$(document).ready(function() {
	hide();
	AtClick();
	$('#button').mouseleave(hide);
});

function AtClick(){
	$('.apb').on('click', function(){
		for(var i = 1; i < 6; ++i){
			ButtonClick(i);
		}
	});
}

function ButtonClick(k) {
		if (array[k] == -1) {
			for (var i = 1; i <= 5; i++) {
				if (array[$('#'+i).attr("id")] == -1) {
					$('#'+i).css("background-color","gray");
				}
			}
			$('#'+k).children('span').show();

			var state = $('#'+k);
			var ran = Math.random() * 1000;
			html = $.get("/" + ran, function(req) {
				if(req.length == 0)
					return true;
				$(state).children('span').html(req);
				sum += req*1;
				array[$(state).attr("id")] = req;

				for (var i = 1; i <= 5; i++) {
					if (array[$('#'+i).attr("id")] == -1) {
						$('#'+i).css("background-color","rgb(48,63,159)");
					}
				}

				$(state).css("background-color","gray");
				InfoClick();
			});
		}
}

function InfoClick() {
	var i;
	for(i = 1; i < 6; ++i){
		if(array[$('#'+i).attr("id")] == -1){
			break;
		}
	}
	if(i == 6){
	$('#info-bar').html(sum);
	}
}

function hide() {
	$("span").hide();
	$("span").html("...");
	$('li').css("background-color","rgb(48,63,159)");
	stop = 0;
	sum = 0;
	$('#info-bar').html("");
	if (stop) {
		html.abort();
	}
	$('#button').mouseleave(hide);
	array = [-1,-1,-1,-1,-1,-1];
	//a = [-1,-1,-1,-1,-1];
}
