const fs = require('fs');
var robot = require("robotjs");


let filePath = require('fs').readFileSync('./record/fileopened.txt').toString();
filePath = filePath.replace('\n', '');
let file = fs.readFileSync(filePath).toString();
let jsonchar = '[' + file.replace(/.$/, "]");
var record = JSON.parse(jsonchar);
var interval = null;
var sleep = require('sleep');
//Supprime les 4 derniers éléments du tableau
record.pop();
record.pop();
record.pop();
record.pop();

console.log(record)


if (record.length > 0) {
    for (i in record) {
        let line = record[i];
        let prevLine = null;



        if (record[i - 1] != null) {
            prevLine = record[i - 1];
            console.log(line.interval - prevLine.interval)
            interval = line.interval - prevLine.interval;
            if (interval != 0) {

                sleep.msleep(line.interval - prevLine.interval);
            }
        }
        //console.log(line);

        if (line.type === "keypress") {
            console.log("keypress")

            // robot.setMouseDelay(line.interval)
            if (line != prevLine) {

                robot.typeString(line.char);
            }
        }
        //Action souris
        //Déplacer


        if (prevLine != null && prevLine.type === "mousedown" && line.type === "mousedrag") {
            console.log("déplacer 1 ")
            robot.moveMouse(prevLine.x, prevLine.y);

            robot.mouseToggle("down");
        }
        if (prevLine != null && prevLine.type === "mousedrag" && line.type === "mouseup") {
            console.log("déplacer 2 ")
            robot.moveMouse(prevLine.x, prevLine.y);
            robot.mouseToggle("up");
        }
        //Click

        if (line.type === "mouseclick") {
            console.log("click");


            //   robot.setMouseDelay(line.interval)
            robot.moveMouse(line.x, line.y);
            robot.mouseClick();
        }

        if (prevLine != null) {
            console.log("line")
            console.log(line)
            console.log(line.interval)
            /* if (line.interval != prevLine.interval) {
             console.log("!=")
             
             console.log("prevLine")
             console.log(prevLine)   
             console.log(prevLine.interval)
             
             console.log("record i-2")
             console.log(record[i-2])
             }
             interval = line.interval - prevLine.interval
             console.log("interval")
             console.log(interval)*/

        }

        //robot.setMouseDelay(line.interval);
    }
}