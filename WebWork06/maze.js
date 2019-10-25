window.onload = function() {
	var cheated = false;
	document.getElementById("S").onmouseover=function() {
		//document.getElementById("E").className -= "active";
		this.className = "active";
		var display = true;   // 信息提示展示与否判断
		var won = true;
		var a = true;  // 协助判断作弊与否
		cheated = false;
		var end = false; // 判断鼠标是否经过“E”.
		document.getElementById("display").textContent="";
		// 墙壁的变化------------------------------------------------
		document.getElementById('top-block').onmouseover=BoundaryError;
		document.getElementById('top-block').onmouseout=Normalize;
		document.getElementById('right-block').onmouseover=BoundaryError;
		document.getElementById('right-block').onmouseout=Normalize;
		document.getElementById('left-block').onmouseover=BoundaryError;
		document.getElementById('left-block').onmouseout=Normalize;
		document.getElementById('bottom-block').onmouseover=BoundaryError;
		document.getElementById('bottom-block').onmouseout=Normalize;
		document.getElementById('middle-block').onmouseover=BoundaryError;
		document.getElementById('middle-block').onmouseout=Normalize;
		function BoundaryError(event) {
			if (display) {
				event.target.className="block-false";
				document.getElementById("display").textContent="You lose";
				won = false;
			}
			document.getElementById("S").className = "checkpoint";
		}
		function Normalize(event) {
			display = false;
			event.target.className="block";
			won = false;
		}
		// ------------------------------------------------------------
		
		document.getElementById("pos").onmouseleave=cheat;
		function cheat() {
			cheated = true;
		}
		document.getElementById("E").onmouseover=function() {
			document.getElementById("S").className = "checkpoint";
			//this.className = "active";
			display = false;
			end = true;
			if (a && won && !cheated) {
				document.getElementById("display").textContent="You win";
				a = false;
			}
			else if (a && won && cheated) {
				cheated = false;
				a = false;
				document.getElementById("display").textContent="Don't cheat, you should start form the 'S' and move to the 'E' inside the maze!"
			}
		}
	}
}

