/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

const ioHook = require('iohook');
const fs = require('fs');

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

//Clicktest
ioHook.on("mouseclick",evt =>{
    let key = {
        "type" : (evt.type),
        "button" : (evt.button),
        "x" : (evt.x),
        "y" : (evt.y)
    };
    chaine.push(JSON.stringify(key));
});

//ioHook.on("mousemove",function(msg){console.log(msg)});

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

//start ioHook
ioHook.start();

//testtestyuio
ioHook.on("keyup", evt =>{
   
    if(evt.rawcode == "27"){
        fs.writeFileSync("test.json", JSON.stringify(chaine));
        ioHook.stop();
    }
});//testrzsztest


