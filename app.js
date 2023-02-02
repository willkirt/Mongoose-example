var express = require("express");
var app = express();
var path = require("path");
var bodyparser = require("body-parser");
var mongoose = require("mongoose");
const { response } = require("express");
var port = process.env.port||3000;
var db = require("./config/database");


app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.json());

mongoose.connect(db.mongoURI,{
    useNewURLParser:true
}).then(function(){
    console.log("connected to MonoDB Database");
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
    console.log(req.body);
    //res.send(req.body);

    new Game(req.body).save().then(function(){
        res.redirect("gameList.html");
    });
});

app.get("/getGames", function(req,res){
    Game.find({}).then(function(game){
        //console.log({game});
        res.json({game});
    });
});

app.post("/deleteGame", function(req,res){
    console.log(`Game deleted ${req.body.game}`);
    Game.findByIdAndDelete(req.body.game).exec();
    res.redirect('gameList.html');
});

app.use(express.static(__dirname+"/pages"));
app.listen(port, function(){
    console.log(`Running on port ${port}`);
});