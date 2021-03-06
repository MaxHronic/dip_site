/**
 * Created by Max on 28.03.2017.
 */
function check() {

    if (sessionStorage.personId == 0) {
        location.href = "index.html";
        alert("Необхідна авторизація")
    }
}

function exit() {
    sessionStorage.personId = 0;
    location.href = "index.html";
}

function setCourse(course) {
    sessionStorage.setItem('course', JSON.stringify(course));
    alert(id + spec + name + about + author + mark);
}

function getValue(text) {
    var parser = new DOMParser();
    var xml = parser.parseFromString(text, 'text/xml');
    var profiles = xml.getElementsByTagName("Course");
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
    var course_arr = [];
    var i = 0;
    while (i < arr.length - 3) {
        var table_r = document.getElementById("myTable").getElementsByTagName('tbody')[0];
        course_arr.push(
            id = arr[i][0].innerHTML,
            spec = arr[i][1].innerHTML,
            name = arr[i][2].innerHTML,
            about = arr[i][3].innerHTML,
            author = arr[i][4].innerHTML,
            mark = arr[i][5].innerHTML
        )


        var row = table_r.insertRow(i);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        cell1.innerHTML = arr[i][0].innerHTML;
        cell2.innerHTML = arr[i][1].innerHTML;

        cell3.innerHTML = '<a onclick="setCourse( var course = course_arr[i];)" href="find_courses.html">' +
            arr[i][2].innerHTML + '</a>';
        cell4.innerHTML = arr[i][4].innerHTML;
        cell5.innerHTML = arr[i][5].innerHTML;
        i++;
    }
}

function CoursesList() {

    var findCourses = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:adap="http://adapt.course/">' +
        '<soapenv:Header/>' +
        '<soapenv:Body>' +
        '<adap:FindCourses>' +
        '<personId>' + sessionStorage.personId + '</personId>' +
        '<request>' + document.getElementById("search").value + '</request>' +
        '</adap:FindCourses>' +
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
    };
    xhr.setRequestHeader('Content-Type', 'text/xml');
    xhr.send(findCourses);
//            xhr.send(Authorize(document.getElementById("login").value.toString(), document.getElementById("password").value.toString()));
}