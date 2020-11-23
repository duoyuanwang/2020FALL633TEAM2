var survey;

var surveyNameTxt;
var surveyDescTxt;
var questionRoot;
var submitBtn;
var clearBtn;

$(document).ready(function() {
    surveyNameTxt = $("#survey-name");
    surveyDescTxt = $("#description");
    questionRoot = $("#questions");
    submitBtn = $("button#submit");
    clearBtn = $("button#clear");
    
    parent.getSurvey(parent.clickedSurvey, function(data){
        survey = jQuery.extend(true, {}, data);
        initSurvey();
    });
    
    submitBtn.on("click", submit);
});

function initSurvey() {
    surveyNameTxt.val(survey["name"]);
    surveyDescTxt.val(survey["description"]);
    
    questionRoot.empty();
    questionRoot.append(getQuestion("What is your full name?"));
    jQuery.each(survey["questions"], function(key) {
        let question = survey["questions"][key];
        questionRoot.append(getQuestion(question));
    });
}

function submit() {
    let answer = [];
    jQuery.each($(".question"), function(key){
        answer.push($($(".question")[key]).siblings().val());
    });

    parent.submitAnswer(answer);
}

function clear() {
    initSurvey();
}

function getQuestion(question) {
    if(question == null){
        question = "";
    }
    
    return '<div class="row"><p class="question">' + question +
        '</p><textarea cols="60" rows="5"></textarea></div>';
}