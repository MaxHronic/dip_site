/**
 * Created by Max on 28.03.2017.
 */

function status(){
    if (document.getElementById("status").checked){
        document.getElementById("status").value = "true";
    }
    else{
        document.getElementById("status").value = "false";
    }
}

function getValue(tag, text) {
    var parser, xmlDoc;
    parser = new DOMParser();
    xmlDoc = parser.parseFromString(text, "text/xml");

    try {
        if (xmlDoc.getElementsByTagName(tag)[0].childNodes[0].nodeValue != "0") {
            sessionStorage.setItem(personId , xmlDoc.getElementsByTagName(tag)[0].childNodes[0].nodeValue);
            location.href = "../../pages/main.html";
        }
        else {
            alert("Error in registration!");
        }
    }catch (error){
        alert(xmlDoc.getElementsByTagName("faultstring")[0].childNodes[0].nodeValue);
    }
}
function soapRequest() {

    var registrate = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:adap="http://adapt.course/">' +
        '<soapenv:Header/>' +
        '<soapenv:Body>' +
        '<adap:Registrate>' +
        '<login>' + document.getElementById("login").value.toString() + '</login>' +
        '<password>' + document.getElementById("password").value.toString() + '</password>' +
        '<status>' + document.getElementById("status").value.toString() + '</status>' +
        '</adap:Registrate>' +
        '</soapenv:Body>' +
        '</soapenv:Envelope>';


    function createCORSRequest(method, url) {
        var xhr = new XMLHttpRequest();
        if ("withCredentials" in xhr) {
            xhr.open(method, url, false);
        } else if (typeof XDomainRequest != "undefined") {
//                    alert
            xhr = new XDomainRequest();
            xhr.open(method, url);
        } else {
            console.log("CORS not supported");
            alert("CORS not supported");
            xhr = null;
        }
        return xhr;
    }

    var xhr = createCORSRequest("POST", "http://localhost:8080/AdaptCourse/Adapt");
    if (!xhr) {
        console.log("XHR issue");
        return;
    }
    xhr.onload = function () {
        var results = xhr.responseText;
        console.log(results);
        getValue("RegistrateResult", results)
    }
    xhr.setRequestHeader('Content-Type', 'text/xml');
    xhr.send(registrate);
}
