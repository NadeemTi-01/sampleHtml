function GetName(){
			var uname = document.getElementById('nameTxt').value;
			var greet = "Welcome ";
			var greetMsg = greet.concat(uname);
			document.getElementById('greetMsg').innerHTML = greetMsg;

			document.getElementById('nameDiv').style.display = 'none';
			document.getElementById('underConsDiv').style.display = 'block';
		}

var selectedLevel;
var correctAnswer;
var score = 0;
var wninnigScore = 5;

function StartGame(level){
	selectedLevel = level;
	document.getElementById('GameRuleSection').style.display = 'none';
	document.getElementById('LevelSelectorSection').style.display = 'none';
	
	CountDownAndStratGame();
}

function GenerateQuestionAnswers(){
	var num1 = Math.floor(Math.random() * 10) + 1;
	var num2 = Math.floor(Math.random() * 20) + 20;
	var question = num1 +' + '+ num2;
	correctAnswer = num1 + num2;
	console.log(question +', '+ correctAnswer);
	document.getElementById('QuestionTxt').innerHTML = question;
	GenerateOptions();
}

function GenerateOptions(){
	//removing any span if exist
	const elements = document.getElementsByClassName("innerBox");
	while (elements.length > 0) elements[0].remove();

	var options = [];
	while(options.length < 4)
	{
		var r = Math.floor(Math.random() * 50) + 1;
		if(options.indexOf(r) === -1) options.push(r);
	}
	
	var correctAnswerIndex = Math.floor(Math.random() * 4) + 0;
	options[correctAnswerIndex] = correctAnswer;
	console.log('generatedIndex : ' + correctAnswerIndex);
	console.log(options);

	for (var i = 0; i <= 3; i++) {
		if (i > 1) {
			newSpan.setAttribute('style', 'margin-top: 10px');
		}
		var newSpan = document.createElement('span');
		newSpan.setAttribute('class', 'innerBox');
		newSpan.setAttribute('id', "Option"+ i);
		newSpan.setAttribute('onclick', 'ValidateSelection(this.innerText)');
		document.getElementById('OptionSection').appendChild(newSpan);
		newSpan.innerHTML = options[i];
	}
	document.getElementById('Option1').setAttribute('style', 'margin-left:5px;');
	document.getElementById('Option3').setAttribute('style', 'margin-left:5px;');
}


function ValidateSelection(value){
	console.log(value);

	if (value == correctAnswer) {
		score++;
	}
	else{
		score--;
	}
	if (score == wninnigScore) {
		clearInterval(myTimer);
		document.getElementById('winText').style.display = 'block';
		Clear();
	}
	document.getElementById('ScoreTxt').innerHTML = score;
	GenerateQuestionAnswers();
}

var myTimer;
var count;
var orangeColorTime;
var redColorTime;
function clock() 
{
	if (selectedLevel == 'easy') {
		count = 30;
		orangeColorTime = 20;
		redColorTime = 10;
	}else if (selectedLevel == 'medium') {
		count = 20;
		orangeColorTime = 15;
		redColorTime = 8;
	}else{
		count = 15;
		orangeColorTime = 10;
		redColorTime = 6;
	}
	document.getElementById('CountDownTxt').innerHTML = count;
	myTimer = setInterval(myClock, 1000);
	function myClock() 
	{
		count--;
		TimerConditioner();
	}
}

function TimerConditioner()
{
	document.getElementById("CountDownTxt").innerHTML = count;
	if (count < orangeColorTime) 
	{
		document.getElementById('CountDownTxt').style.background = 'orange';
	}
	if (count < redColorTime) 
	{
		document.getElementById('CountDownTxt').style.background = 'red';
	}
	if (count == 0) 
	{
		clearInterval(myTimer);
		Clear();
		document.getElementById("CountDownTxt").innerHTML = "Oops! Time's Up!!! Try again";
	}
}

var gameStarter;
var CountDownCount = 3;
function CountDownAndStratGame() 
{
	document.getElementById('GameStartCountDownText').innerHTML = '3';
	gameStarter = setInterval(showCount, 1000);
	function showCount() {
		CountDownCount--;
		document.getElementById('GameStartCountDownText').innerHTML = CountDownCount;

		if (CountDownCount < 1) {
			clearInterval(gameStarter);
			document.getElementById('GameStartCountDownText').style.display = 'none';
			//document.getElementById('ScoreTxt').innerHTML = 'Score : ' + score + ' / ' + wninnigScore;
			document.getElementById('ScoreTxt').innerHTML = score;
			document.getElementById('GamePlaySection').style.display = 'block';
			GenerateQuestionAnswers();
			clock();
		}
	}
}

function Clear(){
	document.getElementById('QuestionSection').style.display = 'none';
	document.getElementById('OptionSection').style.display = 'none';
}
