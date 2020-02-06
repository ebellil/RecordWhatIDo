#!/usr/bin/env node
const fs = require('fs');
const electron = require('electron');
const path = require('path');
const url = require('url');
var kill = require('./killprocess');
var dialog = require('electron').dialog;
var dialog = require('electron').dialog;

let tmp, tmp1;
'use strict';
"test"
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = '1';


// SET ENV
process.env.NODE_ENV = 'development';

const {app, BrowserWindow, Menu, ipcMain} = electron;

let mainWindow;
let addWindow;

// Listen for app to be ready
app.on('ready', function () {
    // Create new window
    mainWindow = new BrowserWindow({
        width: 517,
        height: 220,
        webPreferences: {
            nodeIntegration: true
        }
    });
    // Load html in window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol: 'file:',
        slashes: true
    }));
    // Quit app when closed
    mainWindow.on('closed', function () {
        app.quit();
    });

    // Build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    // Insert menu
    Menu.setApplicationMenu(mainMenu);
});

// Handle add item window
function createAddWindow() {
    addWindow = new BrowserWindow({
        width: 300,
        height: 200,
        title: 'Add Shopping List Item'
    });
    addWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'addWindow.html'),
        protocol: 'file:',
        slashes: true
    }));
    // Handle garbage collection
    addWindow.on('close', function () {
        addWindow = null;
    });
}

// open dialog
function openDialog() {
    let file;
    dialog.showOpenDialog(
            {
                title: 'Please select some Open Document Text',
                filters: [
                    {name: 'Open Document txt', extensions: ['txt']},
                    {name: 'All Files', extensions: ['*']}
                ]
            },
            function (filesPath)
            {
                if (filesPath === undefined) {
                } else {
                    file = filesPath.toString();
                    console.log(file);
                    var child_process = require('child_process');
                    child_process.exec('echo ' + file + ' > ./record/fileopened.txt');
                    mainWindow.webContents.send('item:openfile', file);
                }
            }
    );
    //console.log(file);
    app.on('ready', openDialog);
}

// Catch item:add
ipcMain.on('item:add', function (e, item) {
    mainWindow.webContents.send('item:add', item);
    addWindow.close();
    // Still have a reference to addWindow in memory. Need to reclaim memory (Grabage collection)
    //addWindow = null;
});

// Create menu template
const mainMenuTemplate = [
    // Each object is a dropdown
    {
        label: 'File',
        submenu: [
            {
                label: 'Open file',
                click() {
                    mainWindow.webContents.send('item:clear');
                    openDialog();
                    app.on('ready', openDialog);
                }
            },
            {
                label: 'Start Record',
                click() {
                    console.log('Début enregistrement');
                    var child_process = require('child_process');
                    tmp = child_process.exec('node record.js');
                }
            },
            {
                label: 'Stop record',
                click() {
                    console.log('Stopper enregistrement');
                    if (tmp === undefined) {
                    } else {
                        kill.kill(tmp.pid);
                        var content = fs.readFileSync('./record/bot.json').toString();
                    
                        dialog.showSaveDialog(function (fileName) {
                            if (fileName === undefined) {
                                console.log("You didn't save the file");
                                return;
                            }

                            fs.writeFile(fileName+".txt", content, function (err) {
                                if (err) {
                                    alert("An error ocurred creating the file " + err.message)
                                }

                                console.log("The file has been succesfully saved");
                            });
                        });
                        tmp = tmp1;
                        //supprimer bot.json
                    }
                }//click
            },
            /*
             {
             label:'Add Item',
             click(){
             createAddWindow();
             }
             },*/
            /*{
             label:'Clear Items',
             click(){
             mainWindow.webContents.send('item:clear');
             }
             },*/
            {
                label: 'Quit',
                accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click() {
                    app.quit();
                }
            }
        ]
    }
];

// If OSX, add empty object to menu
if (process.platform == 'darwin') {
    mainMenuTemplate.unshift({});
}

// Add developer tools option if in dev
if (process.env.NODE_ENV !== 'production') {
    mainMenuTemplate.push({
        label: 'Developer Tools',
        submenu: [
            {
                role: 'reload'
            },
            {
                label: 'Toggle DevTools',
                accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools();
                }
            }
        ]
    });
}