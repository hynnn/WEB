var sec = 0;
var min = 0;
var hour = 0;
var flag = 0;


window.onload = function() {
    create_picture();
    
	function create_picture() {
	    picture = document.getElementById("picture");
	    for (var i = 0; i < 16; i++) {
	        var temp = document.createElement("div");
	        temp.addEventListener("click", pic_move);
	        temp.className = "picture_0" + " " + "part_" + i 
	        temp.id = "position_" + i
	        picture.appendChild(temp);
        }
        
	}

	document.getElementById("restart").onclick = function() {
	    document.getElementById("gameInfo").innerText = "";
	    var part = document.getElementById("picture").children;
	    random_arr = [];
	    for (var i = 0; i < 15; i++) {
	        random_arr[i] = i;
	    }
	    random_arr.sort( function() {
            return 0.5 - Math.random()
        });
	    for (var i = 0; i < 15; i++) {
	        part[i].id = "position_" + random_arr[i];
	    }
        part[15].id = "position_" + 15;
        flag = 1;
        step.value = 0;
        var time = document.getElementById("time");
        time.value = "00:00:00";
        sec = 0;
        min = 0;
        hour = 0;
        clock();
        function clock() { 
            if(flag == 1){
            var time = document.getElementById("time");
            return setInterval(function(){
                var str_sec = sec;
                var str_min = min;
                var str_hour = hour;
                if(sec < 10)
                   str_sec = "0" + sec;
                if(min < 10)
                    str_min = "0" + min;
                if(hour < 10)
                    str_hour = "0" + hour;
                var str_time = str_hour+":"+str_min+":"+str_sec;
                time.value = str_time;
                sec++;
                if(sec>59){
                    sec = 0;
                    min++;
                }
                if(min>59){
                    min = 0;
                    hour++;
                }
            }, 1000);
            }
            
        }
    }
    
    
	function pic_move(event) {
        var blan = document.getElementsByClassName("part_15");
	    if(flag ==1&&( parseInt(this.id.substring(9))-1 == blan[0].id.substring(9) || 
	    	parseInt(this.id.substring(9))+1 == blan[0].id.substring(9) ||
	        parseInt(this.id.substring(9))-4 == blan[0].id.substring(9) || 
	        parseInt(this.id.substring(9))+4 == blan[0].id.substring(9))) {
	    	var str = blan[0].id;
	        blan[0].id = this.id;
            this.id = str;
            var step_first = document.getElementById("step");
            var now_step = parseInt(step_first.value);
            now_step += 1;
            var temp = now_step.toString();
            step.value = temp;
	        check(); 
	    }
	}

	function check() {
	    for (var i = 0; i < 15; i++) {
	        var item = document.getElementsByClassName("part_" + i);
	        if (item.id != "position_" + i) {
	            document.getElementById("gameInfo").innerText = "Playing...";
	            return;
	        }
	    }
	    document.getElementById("gameInfo").innerText = "You Win!";
	    clearInterval(timer);
	}
}