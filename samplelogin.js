window.onload = function() {
  getUserName();
};

function getUserName(){
	var retrievedObj = JSON.parse(window.localStorage.getItem("userAttemptDetail"));
	if (retrievedObj != "" && retrievedObj != null) {
		var recDate = new Date(retrievedObj.blockTime);
		var thisDate = new Date();
		var datediff = thisDate - recDate
		var datediffMin = Math.floor(datediff / 1000 / 60);
		var tryAfterMn = 30 - datediffMin;
		
		if (retrievedObj.wrongSecretKeyCount > 5) {
			if (datediffMin > 30) {
				document.getElementById('landingDiv').style.display = 'none';
			  document.getElementById('mainDiv').style.display = 'block';
			  retrievedObj.blockTime = null;
			  retrievedObj.wrongSecretKeyCount = 0;
			  window.localStorage.setItem("userAttemptDetail", JSON.stringify(retrievedObj));
			}
			else
			{
				document.getElementById('landingDiv').style.display = 'none';
				document.getElementById('mainDiv').style.display = 'none';
				document.getElementById('showStatus').style.display = 'block';
				document.getElementById('showStatus').innerHTML = 'Hi ' + retrievedObj.uname + ', You Entered Wrong Secret Key too many times. Try after ' + tryAfterMn + ' minutes';
			}
			
		}
		else{
			document.getElementById('username').innerHTML = "Hi " + retrievedObj.uname;
			document.getElementById('landingDiv').style.display = 'none';
			document.getElementById('mainDiv').style.display = 'block';
		}
	}
}

function GetName(){
	var uname = document.getElementById('uname').value;
	var testObject = { 'uname': uname, 'wrongSecretKeyCount': 0, 'blockTime': null };
	window.localStorage.setItem("userAttemptDetail", JSON.stringify(testObject));
	document.getElementById('username').innerHTML = "Hi " + uname;
	document.getElementById('landingDiv').style.display = 'none';
	document.getElementById('mainDiv').style.display = 'block';
}

function ShowSecretKeyInputNote(){
	var secretKeyDisplay = document.getElementById('secretKeyNotes').style.display;
	if (secretKeyDisplay == 'none') {
		//document.getElementById('CancelIcons').style.display = 'block';
		document.getElementById('secretKeyNotes').style.display = 'block';
		document.getElementById('clickHereText').innerHTML = "Cancel";
	}
	else
	{
		document.getElementById('clickHereText').innerHTML = "Click here to know Login Id and Password";
		document.getElementById('secretKeyNotes').style.display = 'none';
	}
}

function ShowSecretKeyInput()
{	
	document.getElementById('secretKeyinput').style.display = 'block';
	document.getElementById('wrongKeyCount').style.display = 'block';
	document.getElementById('CountDownTxt').style.display = 'block';
	document.getElementById('secretStartBtn').style.display = 'none';
	document.getElementById('clickHereText').style.display = 'none';
	document.getElementById('secretKeyNotes').style.display = 'none';
	document.getElementById('CountDownTxt').innerHTML = '10';
	clock();
}

var pauseTimer = false;
var wrongKeyCounter = 2;
function ValidateSecretKey(){
	//pause = true;
	var SecretKey = "Ab1100";
	var secret = document.getElementById('SecretKeyTxt').value;
	if (secret == SecretKey) {
		pauseTimer = true;
		DelayAfterCorrectSecretKey();
	}
	else
	{
		var time = new Date();
		console.log(time);
		var retrievedTestObject = JSON.parse(window.localStorage.getItem('userAttemptDetail'));
		console.log(retrievedTestObject);
		if (retrievedTestObject.wrongSecretKeyCount == 5) {
			retrievedTestObject.wrongSecretKeyCount++;
			retrievedTestObject.blockTime = time;
			window.localStorage.setItem("userAttemptDetail", JSON.stringify(retrievedTestObject));
			document.getElementById('landingDiv').style.display = 'none';
			document.getElementById('mainDiv').style.display = 'none';
			document.getElementById('showStatus').style.display = 'block';
			document.getElementById('showStatus').innerHTML = 'Hi ' + retrievedObj.uname + ', You Entered Wrong Secret Key too many times. Try after 30 minutes';
		}
		else {
			retrievedTestObject.wrongSecretKeyCount++;
			window.localStorage.setItem("userAttemptDetail", JSON.stringify(retrievedTestObject));
		}
		
		document.getElementById('isKeyValid').style.display = 'block';
		document.getElementById('wrongKeyCount').innerHTML = "Attempt remaining : " + wrongKeyCounter;
		if (wrongKeyCounter == 2) {
			document.getElementById('wrongKeyCount').style.background = 'orange';
			document.getElementById('wrongKeyCount').style.color = 'white';
		}
		if (wrongKeyCounter == 1) {
			//document.getElementById('wrongKeyCount').innerHTML = "Last Attempt";
			document.getElementById('wrongKeyCount').style.background = 'red';
			document.getElementById('wrongKeyCount').style.color = 'white';
		}
		if (wrongKeyCounter == 0) {
			EndAll("You exceeded maximum attempt. Refresh page to try again");
			clearInterval(myTimer);
			document.getElementById("CountDownTxt").style.display = 'none';
		}
		else
		{
			wrongKeyCounter--;
		}
	}
}

//var delayCounter = 2;
var FakeProcessing;
function DelayAfterCorrectSecretKey(){
		document.getElementById('FakeProcessing').style.display = 'block';
		FakeProcessing = setInterval(AfterSuccess, 2000);
		move();

		function AfterSuccess(){
		wrongKeyCounter = wrongKeyCounter;
		clearInterval(myTimer);
		document.getElementById('ShowSecretKey').innerHTML = 'Id - nadeem  :  Password - 1234';
		document.getElementById('ShowSecretKey').style.display = 'block';
		document.getElementById("CountDownTxt").style.display = 'none';
		document.getElementById('isKeyValid').style.display = 'none';
		document.getElementById('wrongKeyCount').style.display = 'none';
		document.getElementById('secretKeyinput').style.display = 'none';
		document.getElementById('clickHereText').style.display = 'none';
		document.getElementById('FakeProcessing').style.display = 'none';
		}
	}

function EndAll(message){
	document.getElementById('isKeyValid').innerHTML = message;
	document.getElementById('loginForm').style.display = 'none';
	document.getElementById('wrongKeyCount').style.display = 'none';
	document.getElementById('clickHereText').style.display = 'none';
	document.getElementById('secretKeyinput').style.display = 'none';
	document.getElementById('secretKeyNotes').style.display = 'none';
	document.getElementById('wrongKeyCount').style.display = 'none';
	document.getElementById('refreshIcon').style.display = 'block';
	document.getElementById('isKeyValid').style.background = 'red';
	document.getElementById('isKeyValid').style.color = 'white';
}

function Login(){
	var Id = "nadeem";
	var pass = "1234";

	var userId = document.getElementById('Idtxt').value;
	var userPass = document.getElementById('Passwordtxt').value;

	if (userId != "" && userPass != "") 
	{
		if (userId == Id && userPass == pass) 
		{
			location.href = "sampleMain.html";
		}
		else
		{
			document.getElementById('modalText').innerHTML = "Id or Password not correct! Try again";
			document.getElementById('myModal').style.display = 'block';
		}
	}
	else
	{
		document.getElementById('modalText').innerHTML = "Id or Password is blank!";
		document.getElementById('myModal').style.display = 'block';
				//alert("Id or Password is blank!");
			}
		}

		

		function ReloadPage(){
			location.reload();
		}

// Get the <span> element that closes the modal
var closeBtn = document.getElementsByClassName("closeModal")[0];
// When the user clicks on <span> (x), close the modal
closeBtn.onclick = function() {
	document.getElementById('myModal').style.display = 'none';
}


var myTimer;
function clock() {
	myTimer = setInterval(myClock, 1000);
	var count = 10;

	function myClock() {
		if (!pauseTimer) {
			count--;
		}
		
		document.getElementById("CountDownTxt").innerHTML = count;
			if (count < 6) 
			{
				document.getElementById('CountDownTxt').style.background = 'orange';
			}
			if (count < 4) 
			{
				document.getElementById('CountDownTxt').style.background = 'red';
				//document.getElementById('CountDownTxt').style.color = 'white';
			}
			if (count == 0) 
			{
				clearInterval(myTimer);
				//document.getElementById('secretKeyNotes').style.display = 'none';
				document.getElementById("CountDownTxt").innerHTML = "Oops! Time's Up!!! Try again";
				EndAll("");
				document.getElementById('isKeyValid').style.display = 'none';

			}
		}
	}
var i = 0;
function move() {
  if (i == 0) {
    i = 1;
    var elem = document.getElementById("myBar");
    var width = 1;
    var id = setInterval(frame, 10);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
        i = 0;
        document.getElementById('FakeProcessing').style.display = 'none';
        document.getElementById('CorrectKeyMsg').style.display = 'block';
      } else {
        width=width+1;
        elem.style.width = width + "%";
      }
    }
  }
}
