
function loadAllModuleNames(){
    if(document.getElementById("typeInit")!==null){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
             document.getElementById("typeInit").innerHTML = this.responseText;
             console.log(this.responseText);
            }
        };
        xhttp.open("GET", "/getModulesNames", true);
        xhttp.send();
    }    
}
window.setTimeout(loadAllModuleNames, 1000);
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
            var success =this.responseText.toString().includes("success");
             document.getElementById("StartSurveyButton").disabled =!success;              
             document.getElementById("StartSurveyButton").innerHTML="Start survey";
             document.getElementById("SetRespButton").disabled =true;  
             document.getElementById("resp").innerHTML = "";
             document.getElementById("myAns").value = "";       
             if(success){
                document.getElementById("drawButton").style.display = "block";                    
             } else{                 
                document.getElementById("drawButton").style.display = "none";    
                document.getElementById("graph").style.display = "none";   
             }    
         }
    };
    var e = document.getElementById("typeInit");
    var typeInit = e.options[e.selectedIndex].value;
    xhttp.open("GET", "/init?typeInit="+typeInit, true);
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

function dellSessions(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
               document.getElementById("dellSessionResp").innerHTML = this.responseText;
        }
    };
    xhttp.open("GET", "/dellSessions", true);
    xhttp.send();
}