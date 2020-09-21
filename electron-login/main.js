const electron = require("electron");
// Enable live reload for all the files inside your project directory
require('electron-reload')(__dirname, {
    // Note that the path to electron may vary according to the main file
    electron: require(`${__dirname}/node_modules/electron`)
});
const url = require("url");
const path = require("path");
//the place witch store actual account and password
const config = require("./config");
require('./ipclistener/ipcmain')

const { app, BrowserWindow, ipcMain, Menu } = electron;

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';

app.on("ready", function () {
  loginWindow = new BrowserWindow({
    width: 400,
    height: 600,
    webPreferences: {
      //enable client side .js can use require node.js
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js'),
    },
    resizable: false,
  });
  //load html into window
  loginWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "public/login.html"),
      protocol: "file:",
      slashes: true,
    })
  );

  //build menu from template
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  //insert menu
  Menu.setApplicationMenu(mainMenu);
});

//enable the develop tools, reload, copy and paste on client side for testing
const mainMenuTemplate = [
  {
    label: "Dev Tools",
    submenu: [
      {
        label: "Dev Tools",
        accelerator: process.platform == "darwin" ? "Command+I" : "Ctrl+I",
        click(item, focusedWindow) {
          //pop-up window for dev tools
          focusedWindow.openDevTools({ mode: "undocked" });
        },
      },
      {
        role: "reload",
      },
      {
        role: "copy",
      },
      {
        role: "paste",
      },
    ],
  },
];
