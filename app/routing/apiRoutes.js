var friends = require("../data/friends");
var path = require("path");

app.get("/api/friends", function(req,res){
    res.json(friends);
});

app.post('/api/friends', function(req,res){
    friends.push(req.body);
});