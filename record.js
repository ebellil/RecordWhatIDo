const ioHook = require('iohook');
const fs = require('fs');
const readline = require('readline-sync')
const electron = require('electron');
var writeStream = fs.createWriteStream('./record/bot.json');

let chaine = [];
var buffer;
ioHook.on("keypress", evt =>{
    let key =  {
        "type" : (evt.type),
        "char" : (String.fromCharCode(evt.keychar))
    };

    
    //if(evt.keychar != "27"){ //échap
        chaine.push(key);//JSON.stringify(key)
        buffer = new Buffer.from(JSON.stringify(key) + ',');

        writeStream.write(buffer, 'utf8');

       // console.log(JSON.stringify(key));
    //}
});

//Click
ioHook.on("mouseclick",evt =>{
    let key = {
        "type" : (evt.type),
        "button" : (evt.button),
        "clicks" : (evt.clicks),
        "x" : (evt.x),
        "y" : (evt.y)
    };
    chaine.push(key);
    buffer = new Buffer.from(JSON.stringify(key) + ',');

    writeStream.write(buffer, 'utf8');

});

ioHook.on("mousewheel",function(msg){console.log(msg)});

//Déplacer souris
ioHook.on("mousedown",evt =>{
    let key = {
        "type" : (evt.type),
        "button" : (evt.button),
        "x" : (evt.x),
        "y" : (evt.y)
    };
    chaine.push(key);
    buffer = new Buffer.from(JSON.stringify(key)) + ',';

    writeStream.write(buffer, 'utf8');

});

ioHook.on("mouseup",evt =>{
    let key = {
        "type" : (evt.type),
        "button" : (evt.button),
        "x" : (evt.x),
        "y" : (evt.y)
    };
    chaine.push(key); 
    buffer = new Buffer.from(JSON.stringify(key) + ',');

    writeStream.write(buffer, 'utf8');

});

ioHook.on("mousedrag", evt => {
    let key = {
        "type" : (evt.type),
        "button" : (evt.button),
        "x" : (evt.x),
        "y" : (evt.y)
    };
    chaine.push(key); 
    buffer = new Buffer.from(JSON.stringify(key) + ',');

    writeStream.write(buffer, 'utf8');
});

//start ioHook
ioHook.start();

ioHook.on("keyup", evt =>{
    //if(evt.rawcode == "27"){ //echap
       //var file = readline.question("File's name ? : ");     
       //if(file != null){
       //fs.writeFileSync("./record/test.json", chaine);
            //ioHook.stop();  
            //process.exit();
        //}
    //}
});


