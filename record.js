const ioHook = require('iohook');
const fs = require('fs');
const readline = require('readline-sync')

let chaine = [];
ioHook.on("keypress", evt =>{
    let key =  {
        "type" : (evt.type),
        "char" : (String.fromCharCode(evt.keychar))
    };
    
    if(evt.keychar != "27"){
        chaine.push(JSON.stringify(key));
    }
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
    chaine.push(JSON.stringify(key));
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
    chaine.push(JSON.stringify(key));
});

ioHook.on("mouseup",evt =>{
    let key = {
        "type" : (evt.type),
        "button" : (evt.button),
        "x" : (evt.x),
        "y" : (evt.y)
    };
    chaine.push(JSON.stringify(key)); 
});

ioHook.on("mousedrag", evt => {
    let key = {
        "type" : (evt.type),
        "button" : (evt.button),
        "x" : (evt.x),
        "y" : (evt.y)
    };
    chaine.push(JSON.stringify(key)); 
});

//start ioHook
ioHook.start();

ioHook.on("keyup", evt =>{
   
    if(evt.rawcode == "27"){
       var file = readline.question("File's name ? : ");     
       if(file != null){
            fs.writeFileSync("./record/"+file+".json", JSON.stringify(chaine));
            ioHook.stop();  
            process.exit();
        }
    }
});


