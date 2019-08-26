$(document).on("ready", function () {
    const questions = [
        "You would enjoy living with a pet monkey or duck",
        "You would consider yourself a perfectionist",
        "You would cancel plans to live over seas to be with your lover",
        "You enjoy saying pickup lines",
        "You would enjoy moving a new couch",
        "You would enjoy playing a musical insturment for friends",
        "You can't remember the last time you forgot to give back a borrowed item of clothing",
        "You gave it your all in past relationships",
        "You would date a coworker/client",
        "You would rather go out as opposed to staying in with friends"
    ]
    const user = {
        name: "John Doe",
        photo: "https://www.google.com",
        scores: []
    };
    let currQuest = 0;
    let submission = false;

    
    const graph = $("#graph");
    let animInt;

    function updateChart(target=0,percent=0) {
        const canvas = $("#graph canvas");
        const lineWidth = 10;
        const rotate = 0;
        let graphSize = graph.width();

        canvas.attr("width",graphSize);
        canvas.attr("height",graphSize);


        const ctx = canvas.get()[0].getContext('2d');
        ctx.clearRect(0, 0, graphSize, graphSize);
        ctx.translate(graphSize / 2, graphSize / 2); // change center
        ctx.rotate((-1 / 2 + rotate / 180) * Math.PI); // rotate -90 deg

        //imd = ctx.getImageData(0, 0, 240, 240);
        var radius = (graphSize - lineWidth) / 2;
        const drawCircle = function(color, percent) {
            percent = Math.min(Math.max(0, percent || 1), 1);
            ctx.beginPath();
            ctx.arc(0, 0, radius, 0, Math.PI * 2 * percent, false);
            ctx.strokeStyle = color;
            ctx.lineCap = 'round'; // butt, round or square
            ctx.lineWidth = lineWidth
            ctx.stroke();
        };

        drawCircle('#E0FFFF', 100 / 100);
        if (percent > 0) {
            drawCircle('#00FFFF', percent / 100);
        };
        $("#graph span").text(percent + "%");
        clearInterval(animInt);
        animInt = setInterval(function() {
            if (percent >= target) return clearInterval(animInt);
            percent++;
            $("#graph span").text(percent + "%");
            ctx.clearRect(0, 0, graphSize, graphSize);
            drawCircle('#E0FFFF', 100 / 100);
            if (percent > 0) {
                drawCircle('#00FFFF', percent / 100);
            };
        },16)
    };    

    function updateQuestion() {
        $("#question").text(questions[currQuest]);
        $("#current").text(currQuest+1);
        $("#survey .determinate").css("width",`${((currQuest+1)/questions.length)*100}%`);
    };

    $("#info-form").on("submit", function(e) {
        user.name = $("#first_name").val() + " " + $("#last_name").val();
        user.photo = $("#photo").val();

        function validatePhoto() {
            $(`#info-form[type="submit"]`).attr("disabled",true);
            $("#image-validator").off("load error");
            $("#image-validator").on("load error", function(res) {
                if (res.type == "error") { 
                    $("#photo").removeClass("valid");
                    $("#photo").addClass("invalid");
                    return alert("Invalid photo..");
                };    
                $("#photo").removeClass("invalid");
                // Reset all input
                $("#info-form").css("display","none");
                $("#info-form").find("input").val("");
                // Start questionaire
                updateQuestion();
                $("#survey").css("display","block");
            });
            $("#image-validator").attr("src",user.photo);
        };
        validatePhoto();
        $(`#info-form[type="submit"]`).attr("disabled",false);
        e.preventDefault();
    });


    
    $("#question-form").on("submit", function(e) {
        if (!submission) {
            user.scores.push(parseInt($(this).find("input:checked").attr("data-score")));
            currQuest++;
            updateQuestion();
            if (currQuest == questions.length-1) {
                $(`#question-form button[type="submit"]`).text("Submit");
                submission = true;
            };
        } else {
            user.scores.push(parseInt($(this).find("input:checked").attr("data-score")));
            $(`#question-form button[type="submit"]`).attr("disabled",true);
            $("#survey .progress .anim").removeClass("determinate");
            $("#survey .progress .anim").addClass("indeterminate");
            $.ajax(
                "/api/friends",
                {
                    method: "POST",
                    data: user
                })
                .then(function(res) {
                    let closestScore = Infinity;
                    let matches = [];
                    console.log(res);
                    res.data.forEach(function(person) {
                        let currIndex = 0;
                        let totalDifference = 0;
                        person.scores.forEach(function(score) {
                            totalDifference += Math.abs(user.scores[currIndex]-parseInt(score));
                            currIndex++;
                        });
                        if (totalDifference < closestScore) {
                            closestScore = totalDifference;
                            matches = [person];
                        } else if (totalDifference === closestScore) {
                            matches.push(person);
                        };
                    });
                    console.log(matches);
                    $("#match .name").text(matches[0].name);
                    $("#match .pic").attr("src",matches[0].photo);
                    $("#match").modal("open");

                    const dispScore = Math.floor(((50-closestScore)/50)*100);
                    $("#graph").attr("data-value",dispScore);
                    updateChart(dispScore);
                });
        };
        e.preventDefault();
    });

    $(".modal").modal();

    $(window).on("resize", function(e) {
        updateChart(parseInt($("#graph").attr("data-value")));
    });
});