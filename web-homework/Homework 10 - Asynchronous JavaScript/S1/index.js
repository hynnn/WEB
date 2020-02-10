var stop = 0;
var array = new Array(6);
var sum = 0;
var html;

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
			$(this).css("background-color","rgba(48,63,159,1)");
			$(this).children('span').show();
			stop = 1;

			var state = this;
			html = $.get("/get", function(req) {
				$(state).children('span').html(req);
				sum += req*1;
				array[$(state).attr("id")] = req;

				for (var i = 1; i <= 5; i++) {
					if (array[$('#'+i).attr("id")] == -1) {
						$('#'+i).css("background-color","rgba(48,63,159,1)");
					}
				}

				$(state).css("background-color","gray");
				stop = 0;
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
		if (i == 6) {
			$('#info-bar').html(sum);
		}
	});
}

function hide() {
	$("span").hide();
	$("span").html("...");
	$('li').css("background-color","rgba(48,63,159,1)");
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

