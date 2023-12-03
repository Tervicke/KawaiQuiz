function startQuiz(){ 
	username = document.getElementById('username_input').value
	if(username != " " && username != ""){
		document.cookie = username
		window.location= "frontend/quiz.html"
	}
}
