const friends = require("../data/friends.js");
const originalLength = friends.length;

module.exports = function(app) {
    // Sends list of all stored friends
    app.get("/api/friends", function(req, res) {
        res.json(friends);
    });

    // Storing data within friends
    app.post("/api/friends", function(req, res) {
        res.json({status: 200, complete : true, data : friends});
        friends.push(req.body);
        console.log(req.body);
    });

    app.post("/api/clear", function(req, res) {
        friends.length = originalLength;
        res.json({status: 200, complete : true, data : friends});
    });
};