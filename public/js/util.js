var firebaseConfig = {
    apiKey: "AIzaSyCyL8SqsTvp7fiJo0lqRymTQsfOlNS4d4o",
    authDomain: "lfa-grouping-t2.firebaseapp.com",
    databaseURL: "https://lfa-grouping-t2.firebaseio.com",
    projectId: "lfa-grouping-t2",
    storageBucket: "lfa-grouping-t2.appspot.com",
    messagingSenderId: "506414467497",
    appId: "1:506414467497:web:b62a6724962136da581cb8",
    measurementId: "G-RGJ21MRTWB"
};
var database;
var surveys;
var fetching = 0;
var ready = 0;
$(document).ready(function() {
    console.log( "ready!" );
    firebase.initializeApp(firebaseConfig);
    database = firebase.database();
    ready = 1;
    //read sample
    /*
    database.ref("/owner/").once("value").then(function(snapshot) {
        console.log(snapshot.val());
    });
    */
    //write sample
    /*
    database.ref("surveys").set([
        {
            name: "2017FALLCS633",
            publishDate: 1603585530963,
            addDate: 1603585529963,
            description: "survey for CS633 class 2017 fall",
            questions: ["What is your full name?", "What is your BU ID?", "Which time zone are you in?", "Are you attending this class on campus?"],
            answers: [["Mahira Dillon", "15486236", "US Eastern", "Yes"],
                      ["Raphael Hook", "67848973", "EST", "Yes"],
                      ["Katlyn Travis", "98536717", "PST", ""]]
        },
        {
            name: "2018SPRCS633",
            publishDate: 1603585527963,
            addDate: 1603585521963,
            description: "",
            questions: ["What is your full name?", "What is your BU ID?", "What is your favorate color?", "Who do you want to be grouped with?"],
            answers: []
        },
        {
            name: "2020FALLCS633",
            publishDate: 0,
            addDate: 1603585531963,
            description: "",
            questions: ["What is your full name?", "What is your BU ID?"],
            answers: []
        }
    ]);
    */
});

function getAllSurveys(callback){
    while(ready != 1){
        console.log("not ready");
    }
    if(fetching == 1){
        return;
    }
    fetching = 1;
    database.ref("/surveys/").once("value").then(function(snapshot) {
        console.log(snapshot.val());
        surveys = snapshot.val();
        fetching = 0;
        callback();
    });
    
}

function getSurvey(id, callback){
    while(ready != 1){
        console.log("not ready");
    }
    database.ref("/surveys/" + id).once("value").then(function(snapshot) {
        callback(snapshot.val());
    });
}

function addSurvey(survey, callback){
    while(ready != 1){
        console.log("not ready");
    }
    let newSurvey = database.ref("surveys").push(survey, function(error){
        if(error != null){
            console.log(error);
            return;
        }
    });
    
    callback(newSurvey.key);
    
}

function updateSurvey(id, survey, callback){
    database.ref("/surveys/" + id).set(survey, function(){
        callback();
    });
}

function deleteSurvey(id, callback){
    database.ref("/surveys/" + id).remove().then(function(){
        console.log("Remove succeeded.")
        callback();
    });
}

function addAnswer(surveyId, answer){
    database.ref("/surveys/" + surveyId + "/answers").push(answer, function(error){
        if(error == null){
            getAllSurveys();
        }else{
            console.log(error);
        }
    });
}

function updateAnswer(surveyId, answerId, answer){
    database.ref("/surveys/" + surveyId + "/answers/" + answerId).set(answer, function(){
        getAllSurveys();
    });
}

function deleteAnswer(surveyId, answerId, answer){
    database.ref("/surveys/" + surveyId + "/answers/" + answerId).remove().then(function(){
        console.log("Remove succeeded.")
        getAllSurveys();
    });
}
