$(document).ready(function() {

});


function samples(){
    //show all existing data
    console.log(surveys);
    
    //add a new survey
    let newSurvey = {
        addDate: Date.now()
    }
    addSurvey(newSurvey);
    
    //update the last survey
    let survey2Update = surveys["-ML07_Z3lGQmYE-Abgw3"/* a sample survey ID */];
    survey2Update["description"] = "Updated descrition at " + Date.now();
    updateSurvey("-ML07_Z3lGQmYE-Abgw3"/* a sample survey ID */, survey2Update);
    
    //add a new answer to a survey
    let newAnswer = ["Raphael Hook", "67848973", "EST", "Yes"];
    addAnswer("-ML07_Z3lGQmYE-Abgw3"/* a sample survey ID */, newAnswer);
}