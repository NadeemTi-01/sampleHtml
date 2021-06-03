
function ShowSecretKeyInput()
{
	var secretKeyDisplay = document.getElementById('secretKeyinput').style.display;
	if (secretKeyDisplay == 'none') {
		document.getElementById('secretKeyinput').style.display = 'block';
		document.getElementById('wrongKeyCount').style.display = 'block';
		//document.getElementById('hideIcon').style.display = 'block';
		document.getElementById('clickHereText').innerHTML = "Hide";
	}
	else
	{
		document.getElementById('secretKeyinput').style.display = 'none';
		document.getElementById('ShowSecretKey').style.display = 'none';
		document.getElementById('isKeyValid').style.display = 'none';
		document.getElementById('wrongKeyCount').style.display = 'none';
		//document.getElementById('hideIcon').style.display = 'none';
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
                wrongKeyCounter = wrongKeyCounter;
                document.getElementById('wrongKeyCount').style.display = 'none';
                document.getElementById('secretKeyinput').style.display = 'none';
                document.getElementById('clickHereText').style.display = 'none';
	}
	else
	{
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
			document.getElementById('isKeyValid').innerHTML = "You exceeded maximum attempt. Refresh page to try again";
			document.getElementById('loginForm').style.display = 'none';
			document.getElementById('wrongKeyCount').style.display = 'none';
			document.getElementById('clickHereText').style.display = 'none';
			document.getElementById('secretKeyinput').style.display = 'none';
			document.getElementById('refreshIcon').style.display = 'block';
			document.getElementById('isKeyValid').style.background = 'red';
			document.getElementById('isKeyValid').style.color = 'white';
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

			if (userId != "" && userPass != "") 
			{
				if (userId == Id && userPass == pass) 
				{
					location.href = "sampleMain.html";
				}
				else
				{
					alert("Id or Password not correct! Try again");
				}
			}
			else
			{
				alert("Id or Password is blank!");
			}
		}

function GetName(){
      var uname = document.getElementById('nameTxt').value;
      var greet = "Welcome ";
      var greetMsg = greet.concat(uname);
      document.getElementById('greetMsg').innerHTML = greetMsg;

      document.getElementById('nameDiv').style.display = 'none';
}

function ReloadPage(){
	location.reload();
}
