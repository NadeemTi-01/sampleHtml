
function ShowSecretKeyInput()
{
	var secretKeyDisplay = document.getElementById('secretKeyinput').style.display;
	if (secretKeyDisplay == 'none') {
		document.getElementById('secretKeyinput').style.display = 'block';
		document.getElementById('clickHereText').innerHTML = "Hide";
	}else
	{
		document.getElementById('secretKeyinput').style.display = 'none';
		document.getElementById('ShowSecretKey').style.display = 'none';
		document.getElementById('isKeyValid').style.display = 'none';
		document.getElementById('clickHereText').innerHTML = "Click here to know Login Id and Password";
		document.getElementById('SecretKeyTxt').value = "";
	}
}
var wrongKeyCounter = 2;
function ValidateSecretKey(){
	var SecretKey = "Ab1100";
	var secret = document.getElementById('SecretKeyTxt').value;
	if (secret == SecretKey) {
		document.getElementById('isKeyValid').style.display = 'none';
		document.getElementById('ShowSecretKey').style.display = 'block';
	}
	else
	{
		document.getElementById('isKeyValid').style.display = 'block';
		document.getElementById('wrongKeyCount').innerHTML = "Attempt remaining : " + wrongKeyCounter;
		//if (wrongKeyCounter == 1) {
		//	document.getElementById('wrongKeyCount').innerHTML = "Last Attempt";
		//	document.getElementById('isKeyValid').style.background = 'red';
		//}
		if (wrongKeyCounter == 0) {
			document.getElementById('secretKeyinput').style.display = 'none';
			document.getElementById('isKeyValid').innerHTML = "You exceeded maximum attempt. Refresh page to try again";
			document.getElementById('isKeyValid').style.background = 'red';
			document.getElementById('isKeyValid').style.color = 'white';
			document.getElementById('clickHereText').style.display = "none";
			document.getElementById('loginForm').style.display = 'none';
		}
		else
		{
			wrongKeyCounter--;
		}
	}
}

function Login(){
	
			var Id = "nadeem";
			var pass = "1234";

			var userId = document.getElementById('Idtxt').value;
			var userPass = document.getElementById('Passwordtxt').value;

			if (userId == Id && userPass == pass) {
				alert("Successfully Logged In");
			}
			else{
				alert("Id or Password not correct! Try again");
			}
		}