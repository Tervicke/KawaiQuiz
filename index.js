function startQuiz(){ 
	username = document.getElementById('username_input').value
	if(username != " "){
		document.cookie = username
		window.location= "frontend/quiz.html"
	}
}
