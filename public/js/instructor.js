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
            surveyListRoot.append('<li id = "' + key + '" class="survey-list-item">' + surveys[key]['name'] + '</li>');
        });
        $(".survey-list-item").on("click", onSurveyClick);
    });
}

function onSurveyClick(){
    clickedSurvey = $(this).attr("id");
    let survey = surveys[$(this).attr("id")];
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
    
    addSurvey(newSurvey, function(id){
        surveyListRoot.append('<li id = "' + id + '" class="survey-list-item">' + newSurvey['name'] + '</li>');
        surveys[id] = newSurvey;
        $("li#" + id).on("click", onSurveyClick);
        $("li#" + id).click();
    });
}

function removeSurvey(){
    deleteSurvey(clickedSurvey, function(){
        if($("li.survey-list-item").length > 1){
            if($("li#" + clickedSurvey).index() > 0){
                $("li#" + clickedSurvey).remove();
                $("li.survey-list-item:eq(" + ($("li#" + clickedSurvey).index() - 1) +")").click();
            }else{
                $("li#" + clickedSurvey).remove();
                $("li.survey-list-item:eq(" + $("li#" + clickedSurvey).index() +")").click();
            }
        }else{
            clickedSurvey = null;
            surveyDetailFrame.attr("src", "");
            $("li#" + clickedSurvey).remove();
        }
        
    });
}

function publishSurvey(){
    getSurvey(clickedSurvey, function(survey){
        survey["publishDate"] = new Date().getTime();
        updateSurvey(clickedSurvey, survey, function(){
            $("#" + clickedSurvey).click();
            alert("Survey has been published!!");
        });
    });
}