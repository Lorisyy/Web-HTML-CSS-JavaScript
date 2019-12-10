(function() {
	var http = require("http");
	var fs = require('fs');
	var querystring = require('querystring');
	var url = require('url');
	var infoFile = "info.JSON";

	var server = http.createServer((request, response) => {	
		if (request.method == 'GET') {
			requestGet(request, response);
			console.log("GET");
		} else if (request.method == 'POST') {
			requestPost(request, response);
			console.log("POST");
		}
	});
	server.listen(8000);
	console.log("Server 8000 is Ready! Type it in your browser:'http://localhost:8000/'!");

	

	function requestGet(request, response) {
		var pathname = url.parse(request.url).pathname;
		// Load css,js,jpg
		if (pathname.match(/(\.css)|(\.js)|(\.jpg)|(\.jpeg)|(\.gif)|(\.png)|(\.bmp)/) != null) loadCssAndJsAndPic(pathname, response);
		// Load html
		else showPage(querystring.parse(url.parse(request.url).query), response);
	}

	function requestPost(request, response) {
		var newUserData = "";
		request.on("data", (chunk) => {if (chunk != undefined) newUserData += chunk;});
		request.on("end", () => {submitNewUser(querystring.parse(newUserData), response);});	// 监听end事件
	}

	
	function loadCssAndJsAndPic(pathname, response) {
		fs.readFile("." + pathname, (err, data) => {
			if (err) throw err;
			if (pathname.match(/\.css/)) response.writeHead(200, {"Content-Type": "text/css; charset=utf-8"});
			else if (pathname.match(/\.js/)) response.writeHead(200, {"Content-Type": "text/javascript; charset=utf-8"})
			if (pathname.match(/(\.jpg)|(\.jpeg)|(\.gif)|(\.png)|(\.bmp)/)) response.end(data, "base64");
			else response.end(data);
		});
	}

	function showPage(params, response) {
		if (params.username == undefined) showSignInPage(response);
		else {
			fs.readFile(infoFile, (err, data) => {
				if (err) throw err;
				if (data == undefined || data == null || data.length == 0) {data = "[]"; showSignInPage(response);}
				var allUsers = JSON.parse(data);
				var targetUser = findUsername(allUsers, params.username);
				if (targetUser == null) showSignInPage(response);
				else showInfoPage(targetUser, response);
			});
		}
	}

	function submitNewUser(newUser, response) {
		fs.readFile(infoFile, (err, data) => {
			if (err) throw err;
			var allUsers = JSON.parse(data);
			var confictHint = returnConflictHint(allUsers, newUser);
			if (confictHint == null) {	// 如果不冲突，则记录到本地并显示详细信息界面
				allUsers.push(newUser);
				var allUsersString = JSON.stringify(allUsers);
				fs.writeFileSync(infoFile, allUsersString);
				showInfoPage(newUser, response);
				console.log("successful registration!\nshowing " + newUser.username + "'s information ...");
			} else showSignInPage(response, confictHint);
		});
	}


	function findUsername(allUsers, username) {
		for (var i = 0; i < allUsers.length; i++) if (allUsers[i].username == username)
			return allUsers[i];
		return null;
	}

	function showSignInPage(response, confictHint) {	// （confictHint冲突提示）加载注册界面
		response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
		fs.readFile("page.html", (err, data) => {
			if (err) throw err;
			if (confictHint == undefined || confictHint == null) response.end(data);
			else {
				console.log(confictHint);
				response.end(data.toString().replace("Welcome!", confictHint));
				alert(confictHint);
			}
		});
	}

	function showInfoPage(user, response) {			
		response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
		fs.readFile("info.html", (err, data) => {
			if (err) throw err;
			var infoPageHtml = data.toString();
			infoPageHtml = infoPageHtml.replace("UserName", user.username).replace("StudentId", user.studentId).replace("Telephone", user.phone).replace("E-mail", user.email);
			response.end(infoPageHtml);
		});
	}

	function returnConflictHint(allUsers, newUser) {	
		for (var i = 0; i < allUsers.length; i++) {
			if (newUser.username == allUsers[i].username) return "用户名已存在！请重新输入正确的信息。";
			else if (newUser.studentId == allUsers[i].studentId) return "学号已存在！请重新输入正确的信息。";
			else if (newUser.phone == allUsers[i].phone) return "电话已存在！请重新输入正确的信息。";
			else if (newUser.email == allUsers[i].email) return "邮箱已存在！请重新输入正确的信息。";
		}
		return null;
	}

})();