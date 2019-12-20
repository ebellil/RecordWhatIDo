/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var robot = require("robotjs");

/*robot.typeString("Hello World");

// Press enter.
robot.keyTap("enter");*/

var mouse = robot.getMousePos();
/*
robot.moveMouse(0, 0);
robot.mouseToggle("down");
robot.dragMouse(100, 100);*/



//console.log(mouse.x, mouse.y);
//robot.typeString("test");

let fs = require('fs'); 
let file = fs.readFileSync('./test.json').toString(); 
let record = JSON.parse(file);


console.log(JSON.parse(record[0]).char)

for(i in record) { 
    //Action clavier
    let line = JSON.parse(record[i])
    console.log(line)
    if (line.type == "keypress"){
      //console.log(array[i].toString().split(" ")[1]);
        robot.typeString(line.char);
        console.log("line")
    }//
}