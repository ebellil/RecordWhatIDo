#!/usr/bin/env node
const fs = require('fs');
const electron = require('electron');
const path = require('path');
const url = require('url');
var kill= require('./killprocess');
let tmp ;
'use strict';

//var app = require('electron').app;

var dialog = require('electron').dialog;

// SET ENV
process.env.NODE_ENV = 'development';

const {app, BrowserWindow, Menu, ipcMain} = electron;

let mainWindow;
let addWindow;

// Listen for app to be ready
app.on('ready', function(){
  // Create new window
  mainWindow = new BrowserWindow({
    width: 517,
    height:220,
  });
  // Load html in window
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'mainWindow.html'),
    protocol: 'file:',
    slashes:true
  }));
  // Quit app when closed
  mainWindow.on('closed', function(){
    app.quit();
  });

  // Build menu from template
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  // Insert menu
  Menu.setApplicationMenu(mainMenu);
});

// Handle add item window
function createAddWindow(){
  addWindow = new BrowserWindow({
    width: 300,
    height:200,
    title:'Add Shopping List Item'
  });
  addWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'addWindow.html'),
    protocol: 'file:',
    slashes:true
  }));
  // Handle garbage collection
  addWindow.on('close', function(){
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
          { name: 'Open Document Json', extensions: ['json'] },
          { name: 'All Files', extensions: ['*'] }
        ]
      }, 
      function(filesPath) 
      {
      file = filesPath.toString();
       var child_process = require ('child_process');
       child_process.exec('echo ' + file + ' > ./record/fileopened.txt');
       mainWindow.webContents.send('item:openfile', file);

      }
    );
    //console.log(file);
  app.on('ready', openDialog);
}

// Catch item:add
ipcMain.on('item:add', function(e, item){
  mainWindow.webContents.send('item:add', item);
  addWindow.close(); 
  // Still have a reference to addWindow in memory. Need to reclaim memory (Grabage collection)
  //addWindow = null;
});

// Create menu template
const mainMenuTemplate =  [
  // Each object is a dropdown
  {
    label: 'File',
    submenu:[
      {
        label:'Open file',
        click(){
          mainWindow.webContents.send('item:clear');
          openDialog();
          app.on('ready', openDialog);
        }
      },
      {
        label:'Start Record',
        //accelerator:process.platform == 'darwin' ? 'Command+E' : 'Ctrl+E',
        click(){
          //mainWindow.webContents.send('item:clear');
          console.log('Début enregistrement');          
          var child_process = require ('child_process');
          tmp = child_process.exec('node record.js');
        }
      },
      {
        label:'Stop record',
        //accelerator:process.platform == 'darwin' ? 'Command+F' : 'Ctrl+F',
        click(){
          console.log('Stopper enregistrement');
          kill.kill(tmp.pid);        
        }//click
      },
/*
      {
        label:'Add Item',
        click(){
          createAddWindow();
        }
      },*/
      {
        label:'Clear Items',
        click(){
          mainWindow.webContents.send('item:clear');
        }
      },
      {
        label: 'Quit',
        accelerator:process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
        click(){
          app.quit();
        }
      }
    ]
  }
];

// If OSX, add empty object to menu
if(process.platform == 'darwin'){
  mainMenuTemplate.unshift({});
}

// Add developer tools option if in dev
if(process.env.NODE_ENV !== 'production'){
  mainMenuTemplate.push({
    label: 'Developer Tools',
    submenu:[
      {
        role: 'reload'
      },
      {
        label: 'Toggle DevTools',
        accelerator:process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
        click(item, focusedWindow){
          focusedWindow.toggleDevTools();
        }
      }
    ]
  });
}