/**
 * Created by Max on 12.03.2017.
 * @return {string}
 */
function Authorize(login,password){
return '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:adap="http://adapt.course/">' +
    '<soapenv:Header/>' +
    '<soapenv:Body>' +
    '<adap:Authorize>' +
    '<login>' + login + '</login>' +
    '<password>' + password + '</password>' +
    '</adap:Authorize>' +
    '</soapenv:Body>' +
    '</soapenv:Envelope>';
}

function editCourse(personId,courseId ){
return '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:adap="http://adapt.course/">' +
    '<soapenv:Header/>' +
    '<soapenv:Body>' +
    '<adap:EditCourse>' +
    '<personId>'+personId+'</personId>' +
    '<courseId>'+courseId+'</courseId>' +
    '</adap:EditCourse>' +
    '</soapenv:Body>' +
    '</soapenv:Envelope>';
}

var findCourses = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:adap="http://adapt.course/">' +
    '<soapenv:Header/>' +
    '<soapenv:Body>' +
    '<adap:FindCourses>' +
    '<personId>?</personId>' +
    '<name>?</name>' +
    '</adap:FindCourses>' +
    '</soapenv:Body>' +
    '</soapenv:Envelope>';

var getCourseProgress = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:adap="http://adapt.course/">' +
    '<soapenv:Header/>' +
    '<soapenv:Body>' +
    '<adap:GetCourseProgress>' +
    '<personId>?</personId>' +
    '<courseId>?</courseId>' +
    '</adap:GetCourseProgress>' +
    '</soapenv:Body>' +
    '</soapenv:Envelope>';

var getMyProgress = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:adap="http://adapt.course/">' +
    '<soapenv:Header/>' +
    '<soapenv:Body>' +
    '<adap:GetMyProgress>' +
    '<personId>?</personId>' +
    '</adap:GetMyProgress>' +
    '</soapenv:Body>' +
    '</soapenv:Envelope>';

var getTest = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:adap="http://adapt.course/">' +
    '<soapenv:Header/>' +
    '<soapenv:Body>' +
    '<adap:GetTest>' +
    '<personId>?</personId>' +
    '<courseId>?</courseId>' +
    '<topicId>?</topicId>' +
    '<total>?</total>' +
    '</adap:GetTest>' +
    '</soapenv:Body>' +
    '</soapenv:Envelope>';


var registrate = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:adap="http://adapt.course/">' +
    '<soapenv:Header/>' +
    '<soapenv:Body>' +
    '<adap:Registrate>' +
    '<login>?</login>' +
    '<password>?</password>' +
    '<status>?</status>' +
    '</adap:Registrate>' +
    '</soapenv:Body>' +
    '</soapenv:Envelope>';

var setQuestion = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:adap="http://adapt.course/">' +
    '<soapenv:Header/>' +
    '<soapenv:Body>' +
    '<adap:SetQuestions>' +
    '<personId>?</personId>' +
    '<questions>' +
    '<adap:questionId>?</adap:questionId>' +
    '<adap:topicId>?</adap:topicId>' +
    '<adap:text>?</adap:text>' +
    '<adap:ansver1>?</adap:ansver1>' +
    '<adap:weight1>?</adap:weight1>' +
    '<adap:ansver2>?</adap:ansver2>' +
    '<adap:weight2>?</adap:weight2>' +
    '<adap:ansver3>?</adap:ansver3>' +
    '<adap:weight3>?</adap:weight3>' +
    '<adap:ansver4>?</adap:ansver4>' +
    '<adap:weight4>?</adap:weight4>' +
    '<adap:weight_q>?</adap:weight_q>' +
    '<adap:type_control>?</adap:type_control>' +
    '</questions>' +
    '</adap:SetQuestions>' +
    '</soapenv:Body>' +
    '</soapenv:Envelope>';


var subscribe = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:adap="http://adapt.course/">' +
    '<soapenv:Header/>' +
    '<soapenv:Body>' +
    '<adap:SubscribeCourse>' +
    '<personId>?</personId>' +
    '<courseId>?</courseId>' +
    '</adap:SubscribeCourse>' +
    '</soapenv:Body>' +
    '</soapenv:Envelope>';