var robot = require("robotjs");
var fs = require('fs');

let file = fs.readFileSync('./record/testClick.json').toString();
let record = JSON.parse(file);
let prevClick = null;

if (record.length > 0) {
    for (i in record) {
        let line = JSON.parse(record[i])
        let prevLine = null
        if (record[i - 1] != null) {
            prevLine = JSON.parse(record[i - 1]);
        }
        //Action clavier
        console.log(line)
        robot.setMouseDelay(500);
        if (line.type === "keypress") {
            robot.typeString(line.char);
        }

        //Action souris
        //Déplacer
        robot.setMouseDelay(500);

        if (prevLine != null && prevLine.type === "mousedown" && line.type === "mousedrag") {
            console.log("déplacer 1 ")
            robot.moveMouse(prevLine.x, prevLine.y);
            robot.setMouseDelay(500);
            robot.mouseToggle("down");
        }
        if (prevLine != null && prevLine.type === "mousedrag" && line.type === "mouseup") {
            console.log("déplacer 2 ")
            robot.moveMouse(prevLine.x, prevLine.y);
            robot.setMouseDelay(500);
            robot.mouseToggle("up");
        }

        //Click
        robot.setMouseDelay(500);
        if (line.type === "mouseclick") {
            robot.setMouseDelay(500);//
            console.log("click");
            robot.moveMouse(line.x, line.y);
            robot.setMouseDelay(1000);
            robot.mouseClick();
            robot.setMouseDelay(500);
        }
    }
}
