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

console.log(robot.getScreenSize())
var DIM = {
    X: 1920,
    Y: 1080,
  };
var robotScreen = robot.getScreenSize();
let prevClick = null;

record.filter( e =>{
   console.log( JSON.parse(e).type == "mouseclick") 
})
if(record.length > 0 ){
    for(i in record) { 
        let line = JSON.parse(record[i])
        let prevLine = null
        if(record[i-1] != null){
            prevLine = JSON.parse(record[i-1]); 
        }

        //Action clavier
        console.log(line)
        if (line.type == "keypress"){
          //console.log(array[i].toString().split(" ")[1]);
            robot.typeString(line.char);
            console.log("line")
        }
        
        //Action souristest
        //Déplacer
        robot.setMouseDelay(200);
        if(prevLine != null && prevLine.type == "mousedown" && line.type == "mouseup"){
          //  console.log("déplacer")
          //  console.log("prevLine : " + " x " + prevLine.x + " y " + prevLine.y + typeof prevLine.x)
          //   console.log("mousePosition1 : " + robot.getMousePos().x / robotScreen.width * DIM.X + " " + robot.getMousePos().y / robotScreen.height * DIM.Y);
            robot.moveMouse(prevLine.x, prevLine.y);
          //  console.log("mousePosition2 : " + robot.getMousePos().x + " " + robot.getMousePos().y);
           robot.setMouseDelay(500);
            robot.mouseToggle("down");
            
            robot.setMouseDelay(500);
             robot.moveMouse(line.x, line.y);
            robot.setMouseDelay(500);
            robot.mouseToggle("up");
          robot.setMouseDelay(500);
        }//ttesttest

           
        //Click
         robot.setMouseDelay(500);
        if(line.type == "mouseclick"){
       robot.setMouseDelay(500);
                console.log("prevClick " + prevClick)
                console.log("click");
                robot.moveMouse(line.x, line.y);
                robot.setMouseDelay(500);
                console.log(prevLine)
                if(prevLine.type == "mouseclick"){
                    console.log("doubleclick" + robot.getMousePos())
                  robot.setMouseDelay(500);
                    robot.mouseClick("left",true); 
                      robot.setMouseDelay(500);
                }else{
                    robot.setMouseDelay(500);
                    robot.mouseClick();
                     robot.setMouseDelay(500);
                }
                robot.setMouseDelay(500);
                //test
            
            robot.setMouseDelay(500);
            prevClick = line
        }
    }
}
