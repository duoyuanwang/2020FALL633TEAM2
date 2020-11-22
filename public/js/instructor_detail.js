var survey;
var surveyChanged;

//UI elements
var surveyNameTxt;
var surveyDescTxt;
var questionRoot;
var cancelBtn;
var deleteBtn;
var saveBtn;
var addQuestionBtn;


$(document).ready(function() {
    surveyNameTxt = $("#survey-name");
    surveyDescTxt = $("#description");
    questionRoot = $("#question-list");
    cancelBtn = $("button#cancel");
    deleteBtn = $("button#delete");
    addQuestionBtn = $("#add-question");
    saveBtn = $("button#save");
    
    parent.getSurvey(parent.clickedSurvey, function(data){
        survey = jQuery.extend({}, data);
        surveyChanged = jQuery.extend({}, data);
        initSurvey();
    });
    
    cancelBtn.on("click", restoreChanges);
    addQuestionBtn.on("click", addQuestion);
    deleteBtn.on("click", parent.removeSurvey);
    saveBtn.on("click", saveSurvey);
});

function initSurvey(){
    console.log(survey);
    
    //load survey name
    if(survey["name"] != null){
        surveyNameTxt.attr("value", survey["name"]);
    }else{
        surveyNameTxt.attr("value", "");
    }
    
    //load survey description
    if(survey["description"] != null){
        surveyDescTxt.text(survey["description"]);
    }else{
        surveyDescTxt.text("");
    }
    
    //load questions
    questionRoot.empty();
    questionList = survey["questions"];
    if(survey["questions"] != null){
        jQuery.each(survey["questions"], function(question){
            questionRoot.append(getQuestion(survey["questions"][question]));
        });
    }
    
    
    
    $(".remove-question").on("click", onClickRemoveQuestion);
}

//return a question html with given text
function getQuestion(question){
    if(question == null){
        question = "";
    }
    
    return '<div class="question boxed"><div class="row"><input class="question-text" type="text" size="100" value = "' + question + '"><img class="remove-question" src="./resource/close.png" alt="remove question"  width="30" height="30"></div></div>';
}

//when the delete question button is clicked
function onClickRemoveQuestion(){
    let question = $(this).parent().parent();
    let index = $(".question").index(question);
    question.remove();
    surveyChanged["questions"].splice(index,1);
    console.log(survey["questions"]);
}

function restoreChanges(){
    initSurvey();
}

function addQuestion(){
    questionRoot.append(getQuestion());
    if(surveyChanged["questions"] == null){
        surveyChanged["questions"] = [];
    }
    surveyChanged["questions"].push("");
    $(".remove-question").off("click");
    $(".remove-question").on("click", onClickRemoveQuestion);
}

function saveSurvey(){
    surveyChanged["name"] = surveyNameTxt.val();
    surveyChanged["description"] = surveyDescTxt.val();
    jQuery.each($(".question"), function(index){
        surveyChanged["questions"][index] = $(".question:eq(" + index + ")").children().children("input").val().trim();
    });
    parent.updateSurvey(parent.clickedSurvey, surveyChanged, function(){
        parent.getSurvey(parent.clickedSurvey, function(data){
            survey = data;
            surveyChanged = data;
            initSurvey();
            parent.$(".selected").text(survey["name"]);
        });
    });
}



