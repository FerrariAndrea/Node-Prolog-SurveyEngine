
function loadTest() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        document.getElementById("resp").innerHTML = this.responseText;
        }
    };
    xhttp.open("GET", "/test1", true);
    xhttp.send();
}