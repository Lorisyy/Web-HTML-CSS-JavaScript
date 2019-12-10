(function() {
	$(function() {
		new signIn();
		$("#username").keyup(function() {s.usernameIsValid();});
		$("#studentId").keyup(function() {s.studentIdIsValid();});
		$("#phone").keyup(function() {s.phoneIsValid();});
		$("#email").keyup(function() {s.emailIsValid();});
	});
	var signIn = function () {
		this.listenReset();			// reset Listener
		this.listenSubmit();		// submit Listener
		this.showConfictHint();		// conflict Listener
	}
	var s = signIn.prototype;

	//After 'Reset' botton is clicked, red hint in the page should be cleared.
	s.listenReset = function() {$("button[type=reset]").click(function() {s.resetFormatAndConfictHints();});}
	// Reset the form first
	s.listenSubmit = function() {
		$("#submit").click(function() {
			s.resetFormatAndConfictHints();
			var isValid = true;
			if (!s.usernameIsValid()) isValid = false;
			if (!s.studentIdIsValid()) isValid = false;
			if (!s.phoneIsValid()) isValid = false;
			if (!s.emailIsValid()) isValid = false;
			return isValid;
		});
	}

	s.showConfictHint = function() 
	{
		if ($("#hint").html() != "ConfictHint") $("#hint").show();
	}
	s.resetAndHideHint = function() 
	{
		$("#hint").html("ConfictHint").hide();
	}	
	s.setAllForMatHintGray = function() 
	{
		$("p").each(function(){$(this).removeClass("red");});
	}
	s.resetFormatAndConfictHints = function() 
	{
		s.resetAndHideHint(); s.setAllForMatHintGray();
	} 
	//How to check they are valid or not? Using Rex.
	s.usernameIsValid = function() {
		if ($("#username").val().match(/^[a-zA-Z]{1}[a-zA-Z0-9_]{5,17}$/) != null) {$("p").eq(0).removeClass("red");return true;}
		else {$("p").eq(0).addClass("red");return false;}
	}

	s.studentIdIsValid = function() {
		if ($("#studentId").val().match(/^[1-9]{1}[0-9]{7}$/) != null) {$("p").eq(1).removeClass("red");return true;}
		else {$("p").eq(1).addClass("red");return false;}
	}

	s.phoneIsValid = function() {
		if ($("#phone").val().match(/^[1-9]{1}[0-9]{10}$/) != null) {$("p").eq(2).removeClass("red");return true;}
		else {$("p").eq(2).addClass("red");return false;}
	}

	s.emailIsValid = function() {
		if ($("#email").val().match(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/) != null) {$("p").eq(3).removeClass("red");return true;}
		else {$("p").eq(3).addClass("red");return false;}
	}

})();