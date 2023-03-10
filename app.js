var express = require("express");
var app = express();
var path = require("path");
var bodyparser = require("body-parser");
var mongoose = require("mongoose");
var port = process.env.port||3000;
var db = require("./config/database");


app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.json());

mongoose.connect(db.mongoURI,{
    useNewURLParser:true
}).then(function(){
    console.log("connected to MongoDB Database");
}).catch(function(err){
    console.log(err);
});

require("./models/Game");
var Game = mongoose.model("game");

// Example Routes
app.get("/", function(req,res){
    //res.send("No");
    res.redirect("gameList.html");
})

app.post("/saveGame", function(req,res){
    //console.log(req.body);
    //res.send(req.body);

    new Game(req.body).save().then(function(){
        res.redirect("gameList.html");
    });
});

app.get("/getGames", function(req,res){
    Game.find({}).sort({"game":1}).then(function(game){
        //console.log({game});
        res.json({game});
    });
});

app.post("/deleteGame", function(req,res){
    //console.log(`Game deleted ${req.body.game}`);
    Game.findByIdAndDelete(req.body.game).exec();
    res.redirect('gameList.html');
});

//update route
app.get("/getID::id", function(req, res){
    //console.log(req.params.id);
    res.redirect(`updatePage.html?id=${req.params.id}`);
})

app.post("/updateGame", function(req, res){
    //console.log(req.body);
    Game.findByIdAndUpdate(req.body.id, {game:req.body.game}, function(){
        res.redirect('gameList.html');
    });
    
})

app.post("/searchGames", function(req, res){
    console.log(req.body.game);
    //res.redirect("searchPage.html?game=" + req.body.game);

    Game.find({"game":req.body.game}).then(function(game){
        //console.log(game[0].game);
        //res.redirect("searchPage.html?game=" + game);
        res.redirect("searchPage.html?id=" + game[0]._id + "&game=" + game[0].game);
    }).catch(function(){
        res.redirect("searchPage.html?game=");
    })
})

app.post("/unity", function(req, res){
    console.log("Hello from unity");

    var newData = {
        "level": req.body.level,
        "timeEapsed": req.body.timeElapsed,
        "name": req.body.name
    }
    console.log(newData);
})

app.get("/SendUnityData", function(req, res){
    console.log("Request made");
    var dataToSend = {
        "level": 9000,
        "timeElapsed": 2.75756,
        "name": "DiggleHopperSmith"
    }
    res.send(dataToSend);
})

app.use(express.static(__dirname+"/pages"));
app.listen(port, function(){
    console.log(`Running on port ${port}`);
});