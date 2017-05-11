/**
 * Created by Max on 28.03.2017.
 */


function getValue(tag, text) {
    var parser, xmlDoc;
    parser = new DOMParser();
    xmlDoc = parser.parseFromString(text, "text/xml");

    // try {

    if (xmlDoc.getElementsByTagName(tag) !== null) {
        // alert(xmlDoc.getElementsByTagName(tag)[0].childNodes[0].nodeValue);
        sessionStorage.personId = xmlDoc.getElementsByTagName(tag)[0].childNodes[0].nodeValue;
        if (sessionStorage.personId!==0){
        location.href = "../../pages/main.html";}
        else {alert("Помилка авторизації!");}
    }
    else {
        if (xmlDoc.getElementsByTagName("faultstring") !== null)
            alert(xmlDoc.getElementsByTagName("faultstring")[0].childNodes[0].nodeValue);
        else
            alert("Помилка авторизації!");

    }
// } catch (error) {
//     alert("smth is wrong");
//     // alert(xmlDoc.getElementsByTagName("faultstring")[0].childNodes[0].nodeValue);
// }
}

function soapRequest() {

    var authorize = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:adap="http://adapt.course/">' +
        '<soapenv:Header/>' +
        '<soapenv:Body>' +
        '<adap:Authorize>' +
        '<login>' + document.getElementById("login").value.toString() + '</login>' +
        '<password>' + document.getElementById("password").value.toString() + '</password>' +
        '</adap:Authorize>' +
        '</soapenv:Body>' +
        '</soapenv:Envelope>'


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
        getValue("AuthorizeResult", results)
    }

    xhr.setRequestHeader('Content-Type', 'text/xml');
    xhr.send(authorize);
//            xhr.send(Authorize(document.getElementById("login").value.toString(), document.getElementById("password").value.toString()));
}
