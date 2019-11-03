
function loadTest() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        document.getElementById("testResp").innerHTML = this.responseText;
        }
    };
    xhttp.open("GET", "/test1", true);
    xhttp.send();
}
function init() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("respInit").innerHTML = this.responseText;
             document.getElementById("StartSurveyButton").disabled =!this.responseText.toString().includes("success");              
             document.getElementById("StartSurveyButton").innerHTML="Start survey";
             document.getElementById("SetRespButton").disabled =true;  
             document.getElementById("resp").innerHTML = "";
             document.getElementById("myAns").value = "";             
         }
    };
    var e = document.getElementById("typeInit");
    var strUser = e.options[e.selectedIndex].value;
    xhttp.open("GET", "/init?typeInit="+strUser, true);
    xhttp.send();
}
function startSurvey() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
               document.getElementById("resp").innerHTML = this.responseText;
               document.getElementById("SetRespButton").disabled =false;
               document.getElementById("StartSurveyButton").innerHTML="Reset survey";               
        }
    };    
    var id=document.getElementById("UserId").value;
    xhttp.open("GET", "/startSurvey?MyId="+id, true);
    xhttp.send();
}
function setResp() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
               document.getElementById("resp").innerHTML = this.responseText;
        }
    };
    var id=document.getElementById("UserId").value;
    xhttp.open("GET", "/setResp?MyId="+id+"&respToAns="+ document.getElementById("myAns").value, true);
    xhttp.send();
}