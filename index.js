var ffi = require("ffi");
var fs = require("fs");

var TimeControlLibrary = ffi.Library('./TimeLibrary', {
    "isIdle": ["bool", []],
    "logout": ["void", []]
});

var time = {
    timeRemaining: 100, //in minutes
    lastTime: new Date().getTime()
};
try {
    var fileStatus = fs.statSync("./config.json");
}
catch(err){
    console.log(err);
    fs.writeFileSync("./config.json", JSON.stringify(time));
}
time = JSON.parse(fs.readFileSync("./config.json"));

var checkerFunction = function() {
    console.log("Checking...");
    console.log(JSON.stringify(time));
    if(!TimeControlLibrary.isIdle()){
        time.timeRemaining--;
        fs.writeFileSync("./config.json", JSON.stringify(time));
    }
    if(time.lastTime + (1000 * 60 * 60 * 24 * 7 /* 1 week*/) <= (new Date()).getTime()){
        //if 1 week is up, reset the time
        time.timeRemaining = 60 * 7; //7 hours
        fs.writeFileSync("./config.json", JSON.stringify(time));
    }
    if(time.timeRemaining < 0){
        TimeControlLibrary.logout();
    }
}

console.log("Loaded successfully!");
setInterval(checkerFunction, 1000 * 60 /* 1 minute */);