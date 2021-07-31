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
		
		if (retrievedObj.attemptLeft < 1) {
			if (datediffMin > 30) {
				document.getElementById('landingDiv').style.display = 'none';
			  document.getElementById('mainDiv').style.display = 'block';
			  retrievedObj.blockTime = null;
			  retrievedObj.attemptLeft = 6;
			  window.localStorage.setItem("userAttemptDetail", JSON.stringify(retrievedObj));
			}
			else
			{
				document.getElementById('landingDiv').style.display = 'none';
				document.getElementById('mainDiv').style.display = 'none';
				document.getElementById('showStatus').style.display = 'block';
				//document.getElementById('showStatus').innerHTML = getGreetingMsgByCurrentTime(retrievedObj.uname) + ', You Entered Wrong Secret Key too many times. Try after ' + tryAfterMn + ' minutes';
				document.getElementById('showStatus').innerHTML = 'Hi ' + retrievedObj.uname + ', You Entered Wrong Secret Key too many times. Try again after ' + tryAfterMn + ' minutes';
			}
		}
		else{
			document.getElementById('username').innerHTML = getGreetingMsgByCurrentTime(retrievedObj.uname);
			document.getElementById('landingDiv').style.display = 'none';
			document.getElementById('mainDiv').style.display = 'block';
		}
	}
}

function GetName(){
	var uname = document.getElementById('uname').value;
	if (uname == "") {
		document.getElementById('nameRequireMsg').style.display = 'block';
	}
	else{
		var testObject = { 'uname': uname, 'attemptLeft': 6, 'blockTime': null };
	  window.localStorage.setItem("userAttemptDetail", JSON.stringify(testObject));
		document.getElementById('username').innerHTML = getGreetingMsgByCurrentTime(uname);
		document.getElementById('landingDiv').style.display = 'none';
		document.getElementById('mainDiv').style.display = 'block';
	}
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
	document.getElementById('CountDownTxt').innerHTML = '20';
	clock();
}

var pauseTimer = false;
var wrongKeyCounter;
function ValidateSecretKey(){
	var retrievedTestObject = JSON.parse(window.localStorage.getItem('userAttemptDetail'));
	wrongKeyCounter = retrievedTestObject.attemptLeft;
	var SecretKey = "Ab1100";
	var secret = document.getElementById('SecretKeyTxt').value;
	if (secret == SecretKey) {
		pauseTimer = true;
		DelayAfterCorrectSecretKey();
		retrievedTestObject.attemptLeft = 6;
		window.localStorage.setItem("userAttemptDetail", JSON.stringify(retrievedTestObject));
		//StartHideTimer();
	}
	else
	{
		wrongKeyCounter = wrongKeyCounter-1;
		var time = new Date();
		if (retrievedTestObject.attemptLeft == 1) {
			retrievedTestObject.attemptLeft--;
			retrievedTestObject.blockTime = time;
			window.localStorage.setItem("userAttemptDetail", JSON.stringify(retrievedTestObject));
			document.getElementById('landingDiv').style.display = 'none';
			document.getElementById('mainDiv').style.display = 'none';
			document.getElementById('showStatus').style.display = 'block';
			document.getElementById('showStatus').innerHTML = 'Hi ' + retrievedTestObject.uname + ', You Entered Wrong Secret Key too many times. Try after 30 minutes';
		}
		else {
			retrievedTestObject.attemptLeft--;
			window.localStorage.setItem("userAttemptDetail", JSON.stringify(retrievedTestObject));
		}
		
		document.getElementById('isKeyValid').style.display = 'block';
		document.getElementById('wrongKeyCount').innerHTML = "Attempt remaining : " + wrongKeyCounter;
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

function Login()
{
	var Id = "nadeem";
	var pass = "1234";

	var userId = document.getElementById('Idtxt').value;
	var userPass = document.getElementById('Passwordtxt').value;

	if (userId != "" && userPass != "") 
	{
		if (userId == Id && userPass == pass) 
		{
			var retrievedObj = JSON.parse(window.localStorage.getItem("userAttemptDetail"));
			retrievedObj.attemptLeft = 6;
			window.localStorage.setItem("userAttemptDetail", JSON.stringify(retrievedObj));
			window.location.href = "sampleMain.html";
		}
		else
		{
			document.getElementById('modalText').innerHTML = "Id or Password not correct! Try again";
			document.getElementById('myModal').style.display = 'block';
		}
	}
	else
	{
		if (userId == "" && userPass != "") {
			document.getElementById('modalText').innerHTML = "Id cannot be blank!";
		}
		else if (userId != "" && userPass == "") {
			document.getElementById('modalText').innerHTML = "Password cannot be blank!";
		}
		else{
			document.getElementById('modalText').innerHTML = "Id and Password cannot be blank!";
		}
		document.getElementById('myModal').style.display = 'block';
	}
}

	function ReloadPage()
	{
		location.reload();
	}

// Commented Close Modal Function---------------------------------
// Get the <span> element that closes the modal
//var closeBtn = document.getElementsByClassName("closeModal")[0];
// When the user clicks on <span> (x), close the modal
//closeBtn.onclick = function() {
	//document.getElementById('myModal').style.display = 'none';
//}
//---------------------------------------------------------------

// Close Modal function
function CloseModal(modalId){
	var modalIdToClose = modalId;
	document.getElementById(modalId).style.display = 'none';
}

var hideTimer;
function StartHideTimer() {
	hideTimer = setInterval(myClock, 1000);
	var tCount = 6; //using 5 to count till 5 seconds. use 1+.
	function myClock() {
		tCount--;
		document.getElementById("SecretKeyHideTimerDisplay").innerHTML ='Credentials will hide in ' + tCount + ' secconds';
		if (tCount == 0) 
			{
				clearInterval(hideTimer);
				document.getElementById('ShowSecretKey').style.display = 'none';
			}
		}
	}

var myTimer;
function clock() {
	myTimer = setInterval(myClock, 1000);
	var count = 20;

	function myClock() {
		if (!pauseTimer) {
			count--;
		}
		
		document.getElementById("CountDownTxt").innerHTML = count;
			if (count < 15) 
			{
				document.getElementById('CountDownTxt').style.background = 'orange';
			}
			if (count < 8) 
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
      if (width >= 100) 
      {
        clearInterval(id);
        i = 0;
        document.getElementById('FakeProcessing').style.display = 'none';
        document.getElementById('isKeyValid').style.display = 'none';
        document.getElementById('wrongKeyCount').style.display = 'none';
        document.getElementById('CountDownTxt').style.display = 'none';
        document.getElementById('CorrectKeyMsg').style.display = 'block';
      } 
      else 
      {
        width=width+1;
        elem.style.width = width + "%";
      }
    }
  }
}

function getGreetingMsgByCurrentTime(name)
{
	var today = new Date()
	var curHr = today.getHours()
	var greetMsg;
	if (curHr < 12) {
		greetMsg =  'Good Morning ' + name;
	} else if (curHr < 18) {
		greetMsg = 'Good Afternoon ' + name;
	} else {
		greetMsg = 'Good Evening ' + name;
	}
	return greetMsg;
}

function ShowResetKeyInput(){
	document.getElementById('ResetModal').style.display = 'block';
	//document.getElementById('ResetKeyTxt').style.display = 'block';
	//document.getElementById('rstBtn').style.display = 'block';
}
//Key for reset
var resetKey = "0010";
function Reset(){
	var key = document.getElementById('ResetKeyTxt').value;
	if (key == resetKey) {
		localStorage.clear();
		ReloadPage();
	}else{
		document.getElementById('wrongResetKeyNotification').style.display = 'block';
	}
}

//Saving data to txt file
//var mydata = JSON.parse(file);
//function GetData(){
//	alert(mydata[0]);
//}

