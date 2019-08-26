const path = require("path");

module.exports = function(app) {
    // Opens up the survey taking page
    app.get("/survey", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/survey.html"));
    });

    // Sending the assets folder containing front end css, javascript, and images
    app.get("/assets/:folder/:file", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/assets/"+req.params.folder+"/"+req.params.file));
    });

    // Setting default page to home.html
    app.get("*", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/home.html"));
    });
};