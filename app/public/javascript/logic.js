var friends = require("../../data/friends.js");

$(document).on("ready", function () {
    var survey = {
        question1: "You would enjoy living with a pet monkey or duck",
        question2: "You would consider yourself a perfectionist",
        question3: "You would cancel plans to live over seas to be with your lover",
        question4: "You enjoy saying pickup lines",
        question5: "You would enjoy moving a new couch",
        question6: "You would enjoy playing a musical insturment for friends",
        question7: "You can't remember the last time you forgot to give back a borrowed item of clothing",
        question8: "You gave it your all in past relationships",
        question9: "You would date a coworker/client",
        question10: "You would rather go out as opposed to staying in with friends"
    }

    // Failed attempt at looping through the questions and having them show up on the survey.html instead of hard coding them
    for (let i = 0; i < survey.length; i++) {

        var div = "<div id='question1' class='form-group'>";
        div += "<label for='question1'></label>";
        div += "<p>" + survey[i] + "</p>";
        div += "<select class='form-control'>";
        div += "<option value='5'>Strongly Agree</option>";
        div += "<option value='4'>Slightly Agree</option>";
        div += " <option value='3'>Neutral</option>";
        div += " <option value='2'>Slightly Disagree</option>";
        div += " <option value='1'>Strongly Disagree</option>";
        div += "</select>";
        div += "</div>";

        $("#questions").html(div)

    }

    $("#submit").onclick(function(){
        // Calculate the users score
        totalDifference(){
            var userInput = [];
        };
        // Compare it to the friends array

        // Show the results modal
        $("#resultModal").show()

        // If the users score matches a score in the array, display the friend
        if (userInput == friends.answers) {

        };
    });

});