var begin = 0;
var isCheat = 0;
window.onload = function(){
    addEventListeners();
}
function addEventListeners(){
    for(var i = 0; i<$("div.wall").length; i++){
        $("div.wall")[i].addEventListener('mouseover',lose);
        $("div.wall")[i].addEventListener('mouseout',restore);
    }
    for (var i = 0; i < $("div.button").length; i++){
		$("div.button")[i].addEventListener('mouseover', changeMouseStyle);
    }
	for (var i = 0; i < $("div.way").length; i++){
		$("div.way")[i].addEventListener('mouseover', changeMouseStyle);
    }
    document.getElementById("maze").addEventListener('mouseleave', cheat);
    document.getElementById("startButton").addEventListener('mouseover', start);
    document.getElementById('endButton').addEventListener('mouseover', end);
}

function lose(event) {
    if(begin==1){
        begin = 0;
        var target = event.target;
        if(target.id == 'middletopWall'||target.id == 'middlebottomWall' ){
			document.getElementById("middlebottomWall").className = 'changed';
			document.getElementById("middletopWall").className = 'changed';
        }
        else if(target.id == 'lefttopWall'||target.id == 'leftWall'){
			document.getElementById("leftWall").className = 'changed';
            document.getElementById("lefttopWall").className = 'changed';
        }
        else if(target.id == 'righttopWall'||target.id == 'rightWall'){
			document.getElementById("righttopWall").className = 'changed';
			document.getElementById("rightWall").className = 'changed';
        }
        else
            event.target.className = 'changed';
        
        document.getElementById("screen").innerHTML = "<h2>You lose!</h2>";
    }
}

function restore(event){
	while ($(".changed").length > 0){
		$(".changed")[0].className = 'wall';
	}
}
function changeMouseStyle(event){
    event.target.style.cursor = "pointer"; 
}
function cheat(event) {
	isCheat = 1;
}

function start() {
	begin = 1;
	isCheat = 0;
	document.getElementById("screen").innerHTML = "";
}
function end() {
	if (begin == 1 && isCheat == 0) {
		begin = 0;
		document.getElementById("screen").innerHTML = "<h2>You Win!</h2>";
	} 
	else if (isCheat == 1 && begin == 1) {
		begin = 0;
		isCheat = 0;
		document.getElementById("screen").innerHTML = "<h2>Don't cheat, you should start form the 'S' and move to the 'E' inside the maze!</h2>";
	}
}