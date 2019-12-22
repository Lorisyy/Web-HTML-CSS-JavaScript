/*
*宿永烨 
*18342107
*/
var stop = 0;
var array = new Array(6);
var sum = 0;
var html;

$(document).ready(function() {
	hide();
	AtClick();
	InfoClick();
	$('#button').mouseleave(hide);
});

function AtClick(){
	$('.apb').on('click', function(){
		ButtonClick(1);
	});
}

function ButtonClick(k) {
		if (!stop && array[k] == -1) {
			for (var i = 1; i <= 5; i++) {
				if (array[$('#'+i).attr("id")] == -1) {
					$('#'+i).css("background-color","gray");
				}
			}
			$('#'+k).css("background-color","rgb(48,63,159)");
			$('#'+k).children('span').show();
			stop = 1;

			var state = $('#'+k);
			html = $.get("/get", function(req) {
				$(state).children('span').html(req);
				sum += req*1;
				array[$(state).attr("id")] = req;

				for (var i = 1; i <= 5; i++) {
					if (array[$('#'+i).attr("id")] == -1) {
						$('#'+i).css("background-color","rgb(48,63,159)");
					}
				}

				$(state).css("background-color","gray");
				stop = 0;
				k += 1;
				if(k < 6){
					ButtonClick(k);
				}
				else{
					InfoClick();
				}
				stop = 0;
			});
		}
}

function InfoClick() {
	$('#info-bar').html(sum);
}

function hide() {
	$("span").hide();
	$("span").html("...");
	$('li').css("background-color","rgb\(48,63,159\)");
	stop = 0;
	sum = 0;
	$('#info-bar').html("");
	if (stop) {
		html.abort();
	}
	$('#button').mouseleave(hide);
	array = [-1,-1,-1,-1,-1,-1];
}
