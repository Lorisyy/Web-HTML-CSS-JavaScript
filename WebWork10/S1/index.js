/*
*宿永烨 
*18342107
*/
var stop = 0;
var array = new Array(6);
var sum = 0;
var html;
var count = 0;
$(document).ready(function() {
	hide();
	ButtonClick();
	InfoClick();
	$('#button').mouseleave(hide);
});

function ButtonClick() {
	$('.button').on('click', function() {
		if (!stop && array[$(this).attr("id")] == -1) {
			for (var i = 1; i <= 5; i++) {
				if (array[$('#'+i).attr("id")] == -1) {
					$('#'+i).css("background-color","gray");
				}
			}
			
			$(this).css("background-color","rgb(48,63,159)");
			$(this).children('span').show();
			stop = 1;

			var state = this;
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
				count++;
				if(count==5){
					$('.apb').on('click', function(){$('#info-bar').html(sum);});
					return;
				}
			});
		}
	});
}

function InfoClick() {
	$('#info-bar').on('click', function() {
		var i;
		for (i = 1; i <= 5; i++) {
			if (array[$('#'+i).attr("id")] == -1) {
				break;
			}
		}
		// if (count == 5) {
		// 	$('#info-bar').html(sum);
		// }
	});
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
	for (var i = 1; i <= 5; i++) {
		array[i] = -1;
	}
}

