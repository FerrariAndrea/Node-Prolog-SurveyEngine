
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
        }
    };
    var e = document.getElementById("typeInit");
    var strUser = e.options[e.selectedIndex].value;
    xhttp.open("GET", "/init?typeInit="+strUser, true);
    xhttp.send();
}