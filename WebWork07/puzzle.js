var timer = null;

window.onload = function() {
    var time = document.getElementById("time");
    time.value = -1;
    create_picture();
    // clock()；
	clock();
	function clock() {
	    	time.value ++;
	    	timer = setTimeout(clock, 1000);
	}

	function create_picture() {
		
	    picture = document.getElementById("main_pic");
	    for (var i = 0; i < 16; i++) {
	        var temp = document.createElement("div");
	        temp.addEventListener("click", pic_move);
	        temp.className = "picture_0" + " " + "part_" + i 
	        temp.id = "position_" + i
	        picture.appendChild(temp);
	    }
	}

	document.getElementById("restart").onclick = function() {
		clearInterval(timer);
		time.value = -1;
		clock();
		function clock() {
	    	time.value ++;
	    	timer = setTimeout(clock, 1000);
		}
		document.getElementById("gameInfo").innerText = "";
	    var part = document.getElementById("main_pic").children;
	    random_array = [];
	    for (var i = 0; i < 15; i++) {
	        random_array[i] = i;
	    }
	    random_array.sort( function() {return 0.5 - Math.random()});
	    for (var i = 0; i < 15; i++) {
	        part[i].id = "position_" + random_array[i];
	    }
	    part[15].id = "position_" + 15;
	}

	function pic_move(event) {
		var child = document.getElementsByClassName("part_15");
	    if( parseInt(this.id.substring(9))-1 == child[0].id.substring(9) || 
	    	parseInt(this.id.substring(9))+1 == child[0].id.substring(9) ||
	        parseInt(this.id.substring(9))-4 == child[0].id.substring(9) || 
	        parseInt(this.id.substring(9))+4 == child[0].id.substring(9)) {
	    	var str = child[0].id;
	        child[0].id = this.id;
	        this.id = str;
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