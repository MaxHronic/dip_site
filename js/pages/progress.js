/**
 * Created by Max on 28.03.2017.
 */

var Chart = require('/js/Chart.js');


// ==================================================================================
function check() {

    if (sessionStorage.personId == 0) {
        location.href = "index.html";
        alert("Сессія закінчена. Необхідна повторна авторизація")
    }
}

function exit() {
    sessionStorage.personId = 0;
}


function getValue(text) {
    var parser = new DOMParser();
    var xml = parser.parseFromString(text, 'text/xml');
    var profiles = xml.getElementsByTagName("PersonalProgress");
    var arr = [];
    for (var key in profiles) {
        arr.push([]);
        var nodes = profiles[key].childNodes;
        for (var ele in nodes) {
            if (nodes[ele]) {
                arr[key].push(nodes[ele]);
            }
        }
    }
    console.log(arr);

    document.getElementById('result').style.display = "block";
    var table = document.getElementById("myTable");
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }
    var i = 0;
    while (i < arr.length - 3) {
        var table_r = document.getElementById("myTable").getElementsByTagName('tbody')[0];

        var row = table_r.insertRow(0);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        cell1.innerHTML = arr[i][0].innerHTML;
        cell2.innerHTML = arr[i][1].innerHTML;
        cell3.innerHTML = arr[i][2].innerHTML;
        cell4.innerHTML = arr[i][3].innerHTML + " б.";
        if (arr[i][3].innerHTML < 40) {
            cell5.innerHTML = "F";
        }
        if ((40 < arr[i][3].innerHTML ) && ( arr[i][3].innerHTML < 60)) {
            cell5.innerHTML = "Fx";
        }
        if ((60 < arr[i][3].innerHTML ) && ( arr[i][3].innerHTML < 65)) {
            cell5.innerHTML = "E";
        }
        if ((65 < arr[i][3].innerHTML ) && ( arr[i][3].innerHTML < 75)) {
            cell5.innerHTML = "D";
        }
        if ((75 < arr[i][3].innerHTML ) && ( arr[i][3].innerHTML < 85)) {
            cell5.innerHTML = "C";
        }
        if ((85 < arr[i][3].innerHTML ) && ( arr[i][3].innerHTML < 95)) {
            cell5.innerHTML = "B";
        }
        if ((95 < arr[i][3].innerHTML ) && ( arr[i][3].innerHTML < 100)) {
            cell5.innerHTML = "A";
        }
        i++;
    }
}

function soapRequest() {

    var getMyProgress = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:adap="http://adapt.course/">' +
        '<soapenv:Header/>' +
        '<soapenv:Body>' +
        '<adap:GetMyProgress>' +
        '<personId>' + sessionStorage.personId + '</personId>' +
        '</adap:GetMyProgress>' +
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
        getValue(results);
    }
    xhr.setRequestHeader('Content-Type', 'text/xml');
    xhr.send(getMyProgress);
//            xhr.send(Authorize(document.getElementById("login").value.toString(), document.getElementById("password").value.toString()));
}