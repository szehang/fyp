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

const { app, BrowserWindow, ipcMain, Menu } = electron;

app.on("ready", function () {
  loginWindow = new BrowserWindow({
    width: 400,
    height: 600,
    webPreferences: {
      //enable client side .js can use require node.js
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
    },
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

//listen for login:send event from login.js
ipcMain.on("login:send", function (e, account, password) {
  //console log on server side for testing.
  console.log(`account: ${account} \npassword: ${password}`);

  //checking process...
  //if true redirect/ create a new window for mainWindow.html, close login.html
  if (account == config.account && password == config.password) {
    //console log on server side for testing.
    console.log("login successful.");

    //crate new window for after login success interface
    mainWindow = new BrowserWindow({
      width: 600,
      height: 400,
      webPreferences: {
        //enable client side .js can use require node.js
        nodeIntegration: true,
      },
    });
    //load html into window
    mainWindow.loadURL(
      url.format({
        pathname: path.join(__dirname, "public/mainWindow.html"),
        protocol: "file:",
        slashes: true,
      })
    );

    //close the login window
    loginWindow.close();
  } else {
    //console log on server side for testing.
    console.log("login failed.");

    //if else send error to loginWindow.webContents.send("login:error");
    loginWindow.webContents.send("login:error");
  }
});

//listen for logout:send event from mainWindow.js
ipcMain.on("logout:send", function (e) {
  //crate new window for login interface
  loginWindow = new BrowserWindow({
    width: 400,
    height: 600,
    webPreferences: {
      //enable client side .js can use require node.js
      nodeIntegration: true,
    },
  });
  //load html into window
  loginWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "public/login.html"),
      protocol: "file:",
      slashes: true,
    })
  );

  //close the main window
  mainWindow.close();
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
