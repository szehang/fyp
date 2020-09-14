const electron = require("electron");
const url = require("url");
const path = require("path");

const { app, BrowserWindow, ipcMain, Menu } = electron;

app.on("ready", function () {
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
      pathname: path.join(__dirname, "src/login.html"),
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
  //if else send error to loginWindow.webContents.send("login:error", responseData);
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
