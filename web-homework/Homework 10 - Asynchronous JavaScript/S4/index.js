var stop = 0;
var array = new Array(6);
var sum = 0;
var html;
var a = new Array(6);
var count = 1;

$(document).ready(function() {
	hide();
	AtClick();
	$('#button').mouseleave(hide);
});

function AtClick(){
	$('.apb').on('click', function(){
		for(var i = 1; i < 6; ++i){
			var math = Math.floor(Math.random() * 5 + 1);
			while(a[math] != -1){
				math = Math.floor(Math.random() * 5 + 1);
			}
			a[math] = i;

			var number;
			switch(math){
				case 1:
					number = 'A';
				break;
				case 2:
					number = 'B';
				break;
				case 3:
					number = 'C';
				break;
				case 4:
				 	number = 'D';
				break;
				case 5:
					number = 'E';
				break;
			}
			$('#info-bar').html($('#info-bar').text() + number);
		}
		NextOne();
	});
}

function ButtonClick(k) {
		if (array[k] == -1) {
			for (var i = 1; i <= 5; i++) {
				if (array[$('#'+i).attr("id")] == -1) {
					$('#'+i).css("background-color","gray");
				}
			}
			$('#'+k).css("background-color", "rgba(48,63,159,1)");
			$('#'+k).children('span').show();

			var state = $('#'+k);
			html = $.get("/get" , function(req) {
				$(state).children('span').html(req);
				sum += req*1;
				array[$(state).attr("id")] = req;

				for (var i = 1; i <= 5; i++) {
					if (array[$('#'+i).attr("id")] == -1) {
						$('#'+i).css("background-color","rgba(48,63,159,1)");
					}
				}

				$(state).css("background-color","gray");
				NextOne();
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
	$('li').css("background-color","rgba(48,63,159,1)");
	stop = 0;
	sum = 0;
	count = 1;
	$('#info-bar').html("");
	if (stop) {
		html.abort();
	}
	$('#button').mouseleave(hide);
	for (var i = 1; i <= 5; i++) {
		array[i] = -1;
		a[i] = -1;
	}
}

function NextOne(){
	for(var i = 1; i <= 5; i++){
		if(a[i] == count){
			count++;
			ButtonClick(i);
			break;
		}
	}
}