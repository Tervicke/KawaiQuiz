var QuestionNo = 0;
var option_selected = 0;
var CorrectOption= 1;
var CorrectAnswerScore = 0;
var WrongAnswerScore = 0;

var choice1 = document.getElementById('choice1');
var choice2 = document.getElementById('choice2');
var choice3 = document.getElementById('choice3');
var choice4 = document.getElementById('choice4');
var Question_container  = document.getElementById('Question')


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
		console.log(QuestionNo)
		if(Questions.length == QuestionNo ){
			DisplayScore()
		}
		else{
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
	console.log(percentage)
	rating = "h"

	console.log("percentage = " + percentage)
	console.log("degree= " + ScoreDegree)
	currentScore = 0;
	let progress = setInterval(() =>{
		console.log(currentScore)
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
			rating="mid"
		}
		else{
			rating="good"
			document.getElementById("score").classList.add('NeonGreen')
		}
		document.getElementById("score").innerHTML = currentScore+ ""
		document.getElementById("Scorecircle").style.background = "conic-gradient(var(--rating-color-"+ rating +") " + currentpercentage+"deg, #ededed 0deg)"
		if(currentScore == percentage){
			clearInterval(progress)
		}
		currentScore++;
	},25)
}
function SetQuestion(){
	if(QuestionNo == Questions.length){
		DisplayScore()
	}
	option_selected=0;
	CorrectOption = Questions[QuestionNo].CorrectAns
	Question_container.innerHTML = "&#x2022 " +  Questions[QuestionNo].question;
	choice1.innerHTML = Questions[QuestionNo].options[0]
	choice2.innerHTML = Questions[QuestionNo].options[1]
	choice3.innerHTML = Questions[QuestionNo].options[2]
	choice4.innerHTML = Questions[QuestionNo].options[3]
	QuestionNo++;
}
let Questions = [

	{
		question:"who is the attack Titan ?",
		options: [
			"levi ackernman",
			"eren yeager",
			"armin alert",
			"mikasa ackernman"
		],
		CorrectAns:2
	},

	{
		question:"Who is sogeking ?",
		options: [
			"luffy",
			"nami",
			"usopp",
			"sanji"
		],
		CorrectAns:3
	},

	{
		question:"In the Anime Hunter x Hunter , Hisoka played a role in all of the following major story arcs, except:",
		options: [
			"Hunter Exam Arc",
			"Yorknew City Arc",
			"Greed Island Arc",
			"Chimera Ant Arc"
		],
		CorrectAns:4
	} ,

	{
		question:"After how much time will a person die since the moment their name has been written in a Death Note",
		options: [
			"immediately",
			"1 minute",
			"15 seconds",
			"30 seconds"
		],
		CorrectAns:1
	} ,

	{
		question:"In Dr.Stone for how many years has the Earth been petrified before Senku woke up",
		options: [
			"2700",
			"3700",
			"4700",
			"5700"
		],
		CorrectAns:2,
	} , 

	{
		question:"How many of the Lower Moons were killed by Kibutsuji Muzan in Demon Slayer",
		options: [
			"3",
			"4",
			"5",
			"6"
		],
		CorrectAns:4,
	} ,

	{
		question:"During the Skypiea arc in One Piece, which Strawhat members were swallowed by the Giant Snake",
		options: [
			"Luffy and Robin",
			"Luffy and Nami",
			"Zoro and Robin",
			"Zoro and Nami"
		],
		CorrectAns:2,
	} ,

	{
		question:"In Naruto, all the following characters can use Ninjutsu, except",
		options: [
			"Rock lee",
			"Sakura",
			"Sasuke",
			"Naruto"
		],
		CorrectAns:1,
	} ,

	{
		question:"[Vinland Saga] Where is Ketil's Farm located?",
		options: [
			"Norway",
			"Germany",
			"France",
			"Denmark"
		],
		CorrectAns:4,
	} , 
	{
		question:"After Ace died who ate the Mera Mera no mi ",
		options: [
			"Sabo",
			"Nami",
			"Bartholomeo",
			"blackBeard"
		],
		CorrectAns:1,
	}

];
SetQuestion()