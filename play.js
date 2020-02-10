const fs = require('fs');
var robot = require("robotjs");


let filePath = require('fs').readFileSync('./record/fileopened.txt').toString();
filePath = filePath.replace('\n', '');
let file = fs.readFileSync(filePath).toString();
let jsonchar = '[' + file.replace(/.$/, "]");
var record = JSON.parse(jsonchar);
var interval = null;
var sleep = require('sleep');
var ks = require('node-key-sender');
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

        if (line.type === "keypress") {
            console.log("keypress")
            if (line != prevLine) {
                if (line.code == "65454") {
                    console.log(".")
                    ks.sendKeys(['decimal']);
                } else if (line.code == "65288") {
                    console.log("supprimer")
                    ks.sendKeys(['back_space']);
                } else if (line.code == "65293") {
                    ks.sendKeys(['enter']);
                } else {
                    robot.typeString(line.char);
                }
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
            robot.moveMouse(line.x, line.y);
            robot.mouseClick();
        }
    }
}