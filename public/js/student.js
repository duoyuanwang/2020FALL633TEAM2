var clickedSurvey;

var surveyListRoot;

$(document).ready(function() {
    surveyListRoot = $("#survey-list-body");
    
    fetchSurveys();
});

function fetchSurveys(){
    getAllSurveys(function(){
        surveyListRoot.empty();
        jQuery.each(surveys, function(key){
            console.log(surveys[key]);
            if(surveys[key]["publishDate"] != null && surveys[key]["publishDate"] > 0){
                surveyListRoot.append('<li id = "' + key + '" class="survey-list-item">' + surveys[key]['name'] + '</li>');
            }
            
        });
        $(".survey-list-item").on("click", onSurveyClick);
    });
}

function onSurveyClick(){
    
    clickedSurvey = $(this).attr("id");
    let survey = surveys[$(this).attr("id")];
    $(this).siblings(".survey-list-item").removeClass("selected");
    $(this).addClass("selected");
    $("#detail").attr("src", "student_detail.html");
}

function submitAnswer(answer){
    addAnswer(clickedSurvey, answer, function(){
        alert("Your answer has been submitted!!");
        $("#detail").removeAttr("src");
        $(".selected").removeClass("selected");
    });
}