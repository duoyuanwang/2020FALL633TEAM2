var survey;

//UI elements
var surveyNameTxt;
var studentListRoot;
var answerRoot;

$(document).ready(function() {
    
    studentListRoot = $("ul#student-list-body");
    answerRoot = $("div#result-detail-container");
    surveyNameTxt = $("input#survey-name");
    
    parent.getSurvey(parent.clickedSurvey, function(data){
        survey = jQuery.extend({}, data);
        initSurvey();
    });
});

function initSurvey(){
    console.log(survey);
    
    studentListRoot.empty();
    answerRoot.empty();
    surveyNameTxt.val(survey["name"]);
    let answers = survey["answers"];
    
    jQuery.each(answers, function(index){
        console.log(answers[index]);
        studentListRoot.append(getStudent(index, answers[index][0]));
    });
    
    
    $(".student-list-item").on("click", showAnswerDetail);
}


function getAnswer(question, answer){
    
    if(question == null){
        question = "";
    }
    
    if(answer == null){
        answer = "";
    }
    
    return '<div class="row"><p class="question">' + question +
    '</p><textarea cols="60" rows="5" readonly>' + answer + '</textarea></div>';
}

function getStudent(id, name){
    
    return '<li id="' + id + '" class="student-list-item">' + name + '</li>';
}

function showAnswerDetail(){
    let answerID = $(this).attr("id");
    $(this).siblings().removeClass("selected");
    $(this).addClass("selected");
    answerRoot.empty()
    
    console.log(survey["questions"]);
    console.log(survey["answers"][answerID]);
    
    jQuery.each(survey["questions"], function(index){
        console.log("Answer: " + index);
        console.log(survey["questions"][index]);
        console.log(survey["answers"][answerID][index + 1]);
        
        answerRoot.append(getAnswer(survey["questions"][index], survey["answers"][answerID][index + 1]));
    });
}