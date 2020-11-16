var survey;
$(document).ready(function() {
    parent.getSurvey(parent.clickedSurvey, function(data){
        survey = data;
        initUI();
    });
});

function initUI(){
    console.log(survey);
}