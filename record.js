const ioHook = require('iohook');
const fs = require('fs');
const readline = require('readline-sync');
const electron = require('electron');
var writeStream = fs.createWriteStream('./record/bot.json');

let chaine = [];
var buffer;

function getTime() {

    var date = new Date();
    return date.getTime();

}

var baseTime = getTime();
ioHook.on("keypress", evt => {
    let currentTime = getTime();
    let interval = currentTime - baseTime;
    if(interval == 0 ) interval =1;
    let key = {
        "type": (evt.type),
        "char": (String.fromCharCode(evt.keychar)),
        "code": (evt.rawcode),
        "interval": interval
    };
    //if(evt.keychar != "27"){ //échap
    chaine.push(key);//JSON.stringify(key)
    buffer = new Buffer.from(JSON.stringify(key) + ',');
    writeStream.write(buffer, 'utf8');
});

//Click
ioHook.on("mouseclick", evt => {
    let currentTime = getTime();
    let interval = currentTime - baseTime;
    if(interval == 0 ) interval =1;
    let key = {
        "type": (evt.type),
        "button": (evt.button),
        "clicks": (evt.clicks),
        "x": (evt.x),
        "y": (evt.y),
        "interval": interval
    };
    chaine.push(key);
    buffer = new Buffer.from(JSON.stringify(key) + ',');

    writeStream.write(buffer, 'utf8');

});

ioHook.on("mousewheel", function (msg) {
    console.log(msg)
});

//Déplacer souris
ioHook.on("mousedown", evt => {
    let currentTime = getTime();
    let interval = currentTime - baseTime;
    if(interval == 0 ) interval =1;
    let key = {
        "type": (evt.type),
        "button": (evt.button),
        "x": (evt.x),
        "y": (evt.y),
        "interval": interval
    };
    chaine.push(key);
    buffer = new Buffer.from(JSON.stringify(key)) + ',';
    writeStream.write(buffer, 'utf8');
});

ioHook.on("mouseup", evt => {
    let currentTime = getTime();
   let interval = currentTime - baseTime;
    if(interval == 0 ) interval =1;
    let key = {
        "type": (evt.type),
        "button": (evt.button),
        "x": (evt.x),
        "y": (evt.y),
        "interval": interval
    };
    chaine.push(key);
    buffer = new Buffer.from(JSON.stringify(key) + ',');

    writeStream.write(buffer, 'utf8');

});

ioHook.on("mousedrag", evt => {
    let currentTime = getTime();
    let interval = currentTime - baseTime;
    if(interval == 0 ) interval =1;
    let key = {
        "type": (evt.type),
        "button": (evt.button),
        "x": (evt.x),
        "y": (evt.y),
        "interval": interval
    };
    chaine.push(key);
    buffer = new Buffer.from(JSON.stringify(key) + ',');

    writeStream.write(buffer, 'utf8');
});

//start ioHook

ioHook.start();


/*
 process.on("message", (data) =>{
 console.log(data); 
 });*/


ioHook.on("keyup", evt => {
    //if(evt.rawcode == "27"){ //echap
    //var file = readline.question("File's name ? : ");     
    //if(file != null){
    //fs.writeFileSync("./record/test.json", chaine);
    //ioHook.stop();  
    //process.exit();
    //}
    //}
});


