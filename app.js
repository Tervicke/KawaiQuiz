QuestionNo = 0;
option_selected = 0;
CorrectOption= 1;
CorrectAnswerScore = 0;
WrongAnswerScore = 0;

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
		document.getElementById('choice'+option_selected).classList.add('CorrectAns')
		CorrectAnswerScore++;
	}
	else{
		WrongAnswerScore++;
		document.getElementById('choice'+option_selected).classList.add('WrongAns')
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
	}, 1000);
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
		}
		else if(currentScore<= 40){
			rating="bad"
		}
		else if(currentScore <= 70){
			rating="mid"
		}
		else{
			rating="good"
		}
		document.getElementById("score").innerHTML = currentScore+ ""
		document.getElementById("score").style= "color :var(--rating-color-"+rating+")"
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
	document.getElementById('Question').innerHTML = Questions[QuestionNo].question;
	document.getElementById('choice1').innerHTML = Questions[QuestionNo].options[0]
	document.getElementById('choice2').innerHTML = Questions[QuestionNo].options[1]
	document.getElementById('choice3').innerHTML = Questions[QuestionNo].options[2]
	document.getElementById('choice4').innerHTML = Questions[QuestionNo].options[3]
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
		question:"1) In the Anime Hunter x Hunter , Hisoka played a role in all of the following major story arcs, except:",
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
