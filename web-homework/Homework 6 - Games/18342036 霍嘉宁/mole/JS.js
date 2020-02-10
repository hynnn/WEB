var run = false;
var temp = 0;
var totalTime = 31;
var timer = null;

window.onload = function() {
	createHoles();
	var message = document.getElementById("state");
	var time = document.getElementById("time");
	var score = document.getElementById("score");
	var moles = document.getElementsByClassName("hole");
	
	function createHoles() {
		var main = document.getElementById("main");
		for(var i = 0; i < 60; i++) {
			var toAdd = document.createElement("input");
			toAdd.className = "hole";
	        toAdd.setAttribute("type", "radio");
	        toAdd.setAttribute("name", "button");
			toAdd.addEventListener("click", react);
			main.appendChild(toAdd);
		}
	}
	
	document.getElementById("start").onclick = function() {
		if(run == false) 
			gameStart();
		else 
			gameOver();
	}

	function gameStart() {
		run = true;
		score.value = 0;
		time.value = totalTime;
		message.value = "Playing";
		randomHole();
		clock();
	}

	function gameOver() {
		run = false;
		clearInterval(timer);
		time.value = 0;
		moles[temp].checked = false;
		message.value = "GameOver!";
	}

	function randomHole() {
		temp = parseInt(Math.random() * 60);
		moles[temp].checked = true;
	}

	function clock() {
	    time.value -= 1;
	    timer = setTimeout(clock, 1000);
		if (time.value == 0) 
			gameOver();
	}

	function react() {
		if(run) {
			if(this == moles[temp]) {
				score.value++;
				this.checked = false;
				randomHole();
			}
			else {
				score.value--;
				this.checked = false;
				moles[temp].checked = true;
			}
		}
		else 
			this.checked = false;
	}
}
