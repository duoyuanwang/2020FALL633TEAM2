var surveyListRoot = $("#survey-list-body");
var newSurveyButton = $("#new-survey-button");
var surveyDetailFrame = $("#survey-detail");
var clickedSurvey;

$(document).ready(function() {
    console.log("ready");
    newSurveyButton.on("click", createSurvey);
    fetchSurveys();
});

function fetchSurveys(){
    getAllSurveys(function(){
        surveyListRoot.empty();
        jQuery.each(surveys, function(key){
            console.log(surveys[key]);
            surveyListRoot.append('<li class="survey-list-item">' + surveys[key]['name'] + '<span class="survey-id" style="display: none">' + key + '</span></li>');
        });
        $(".survey-list-item").on("click", onSurveyClick);
    });
}

function onSurveyClick(){
    clickedSurvey = $(this).children(".survey-id").text();
    let survey = surveys[$(this).children(".survey-id").text()];
    $(this).siblings(".survey-list-item").removeClass("selected");
    $(this).addClass("selected");
    
    if(survey["publishDate"] > 0){
        surveyDetailFrame.attr("src", "./instructor_result.html");
    }else{
        surveyDetailFrame.attr("src", "./instructor_detail.html");
    }
}

function createSurvey(){
    let newSurvey = {
        name:"New Survey",
        addDate: new Date().getTime()
    };
    console.log("new survey ");
    console.log(newSurvey);
}