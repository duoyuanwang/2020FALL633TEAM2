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
$(document).ready(function() {
    console.log( "ready!" );
    firebase.initializeApp(firebaseConfig);
    database = firebase.database();
    //read sample
    database.ref("/owner/").once("value").then(function(snapshot) {
        console.log(snapshot.val());
    });
    //write sample
    database.ref("surveys").set([
        {
            name: "2017FALLCS633",
            publishDate: 1603585530963,
            addDate: 1603585529963,
            description: "survey for CS633 class 2017 fall",
            questions: ["What is your full name?", "What is your BU ID?", "Which time zone are you in?", "Are you attending this class on campus?"],
            answers: [["Mahira Dillon", "15486236", "US Eastern", "Yes"],
                      ["Raphael Hook", "67848973", "EST", "Yes"],
                      ["Katlyn Travis", "98536717", "PST", "No"]]
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
});
