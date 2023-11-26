var QuestionNo = 0;
var option_selected = 0;
var CorrectOption= 1; var CorrectAnswerScore = 0;
var WrongAnswerScore = 0;

var choice1 = document.getElementById('choice1');
var choice2 = document.getElementById('choice2');
var choice3 = document.getElementById('choice3');
var choice4 = document.getElementById('choice4');
var Question_container  = document.getElementById('Question')
let questions;

const url = "http://tervicke.pythonanywhere.com/"; 
//const url = "http://127.0.0.1:5000/"
$.ajax({
		url :url,
		type:"GET",
		beforeSend: function(){
		},
		success: function(response , status) {
			Questions = response
			SetQuestion()
		},
	})

document.getElementById("choices").addEventListener('click' , function(){
	if(option_selected != 0){
		Evaluate()
	}
} , false)
function BtnClicked(e){
	if(option_selected == 0 ){
		option_selected = e;
	}
}
function Evaluate(){
	if(CorrectOption== option_selected){
		if(option_selected == 1)
			choice1.classList.add('CorrectAns')
		if(option_selected == 2)
			choice2.classList.add('CorrectAns')
		if(option_selected == 3)
			choice3.classList.add('CorrectAns')
		if(option_selected == 4)
			choice4.classList.add('CorrectAns')
		CorrectAnswerScore++;
	}
	else{
		WrongAnswerScore++;
		if(option_selected == 1)
			choice1.classList.add('WrongAns')
		if(option_selected == 2)
			choice2.classList.add('WrongAns')
		if(option_selected == 3)
			choice3.classList.add('WrongAns')
		if(option_selected == 4)
			choice4.classList.add('WrongAns')
		document.getElementById('choice'+CorrectOption).classList.add('CorrectAns')
	}
	let flag = false;
	setTimeout(() => {
		document.getElementById('choice'+option_selected).classList.remove('WrongAns')
		document.getElementById('choice'+CorrectOption).classList.remove('CorrectAns')
		if(Questions.length == QuestionNo ){
			DisplayScore()
		}
		else{
			console.log(Questions)
			SetQuestion()
		}
	}, 500);
}
function DisplayScore(){
	
	document.getElementById('quizPanel').remove()
	quizEndPanel = document.getElementById('quizEndPanel')
	quizEndPanel.style.display = "block"
	document.body.appendChild(quizEndPanel)
	percentage = Math.floor((CorrectAnswerScore/Questions.length)*100)
	ScoreDegree = (percentage * 360 ) / 100
	rating = "h"

	currentScore = 0;
	let progress = setInterval(() =>{
		let currentpercentage = ((currentScore* 360) / 100 ) 
		if(currentScore == 0 ){
			ScoreDegree=360;
			rating="bad"
			document.getElementById("score").classList.add('NeonRed')
		}
		else if(currentScore<= 40){
			rating="bad"
			document.getElementById("score").classList.add('NeonRed')
		}
		else if(currentScore <= 70){
			document.getElementById("score").classList.add('NeonYellow')
			document.getElementById("score").classList.remove('NeonRed')
			rating="mid"
		}
		else{
			rating="good"
			document.getElementById("score").classList.remove('NeonYellow')
			document.getElementById("score").classList.add('NeonGreen')
		}
		document.getElementById("score").innerHTML = currentScore+ ""
		document.getElementById("Scorecircle").style.background = "conic-gradient(var(--rating-color-"+ rating +") " + currentpercentage+"deg, #ededed 0deg)"
		if(currentScore == percentage){
			clearInterval(progress)
		}
		currentScore++;
	},25)
	
	//send the score to the server
	sendScore(percentage)	
}
function sendScore(percent){
	const data = {
		  percentage: percent,
	}
	$.ajax({
		url: url + 'post',
		dataType: 'json',
		type: 'post',
		contentType: 'application/json',
		data: JSON.stringify(data),
		processData: false,
		success: function( response , status){
			console.log(response)
		},
		error: function( jqXhr, textStatus, errorThrown ){
			console.log( errorThrown );
		}
	});
}
function SetQuestion(){
	check_score() //check for previous score
	if(QuestionNo == 10){
		DisplayScore()
	}
	option_selected=0;
	CorrectOption = Questions[QuestionNo][5]
	Question_container.innerHTML = "&#x2022 " +  Questions[QuestionNo][0];
	choice1.innerHTML = Questions[QuestionNo][1]
	choice2.innerHTML = Questions[QuestionNo][2]
	choice3.innerHTML = Questions[QuestionNo][3]
	choice4.innerHTML = Questions[QuestionNo][4]
	QuestionNo++;
} 
function check_score(){

$.ajax({
		url :url+"check",
		type:"GET",
		beforeSend: function(){
		},
		success: function(response , status) {
			if(response[0] == 'not allowed'){
				console.log(response)
				CorrectAnswerScore = response[1]/10
				DisplayScore()
			}
		},
	})

}
