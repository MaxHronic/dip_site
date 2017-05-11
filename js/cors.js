/**
 * Created by Max on 19.03.2017.
 */



function soapRequest(request) {
    var authorize = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:adap="http://adapt.course/">' +
        '<soapenv:Header/>' +
        '<soapenv:Body>' +
        '<adap:Authorize>' +
        '<login>test1</login>' +
        '<password>123456</password>' +
        '</adap:Authorize>' +
        '</soapenv:Body>' +
        '</soapenv:Envelope>'

    var registrate = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:adap="http://adapt.course/">' +
        '<soapenv:Header/>' +
        '<soapenv:Body>' +
        '<adap:Registrate>' +
        '<login>mtest</login>' +
        '<password>123456</password>' +
        '<status>true</status>' +
        '</adap:Registrate>' +
        '</soapenv:Body>' +
        '</soapenv:Envelope>';

    function createCORSRequest(method, url) {
        var xhr = new XMLHttpRequest();
        if ("withCredentials" in xhr) {
            xhr.open(method, url, false);
        } else if (typeof XDomainRequest != "undefined") {
            alert
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
    xhr.send(request);
    return results;
}