const electron = require("electron");
const config = require("../config");
const url = require("url");
const path = require("path");

const { app, BrowserWindow, ipcMain } = electron;

//----------------------------------------------------------
// login
//----------------------------------------------------------
//listen for login:send event from login.js
ipcMain.on("login:send", function (e, account, password) {
  //console log on server side for testing.
  console.log("[login]: login data received!");
  console.log(`[login]: account: ${account} \n[login]: password: ${password}`);

  //checking process...
  //if true redirect/ create a new window for mainWindow.html, close login.html
  if (account == config.account && password == config.password) {
    //console log on server side for testing.
    console.log("[login]: login successful.");

    //crate new window for after login success interface
    createWindow("main");
    //close the login window
    loginWindow.close();
  } else {
    //console log on server side for testing.
    console.log("[login]: login failed.");

    //if else send error to loginWindow.webContents.send("login:error");
    loginWindow.webContents.send("login:error");
  }
});

//----------------------------------------------------------
// signup
//----------------------------------------------------------
//handel signup:send request from register.js
ipcMain.on("signup:send", function (e, account, password) {
  console.log("[signup]: signup data received!");
  console.log(`[signup]: account: ${account} \n[signup]: password: ${password}`);
  //handel request ...

  success = true;
  //redirect back to sign up
  if (success) {
    console.log("[signup]: signup successful.");
    loginWindow.webContents.send("signup:success");
  } else {
    console.log("[signup]: signup failed.");

    //if else send error to registerWindow.webContents.send("signup:error");
    loginWindow.webContents.send("signup:error");
  }
});

//----------------------------------------------------------
// redirect
//----------------------------------------------------------
//listen for logout:send event from mainWindow.js
ipcMain.on("logout:send", function (e) {
  console.log("[logout]: logout requested.");
  //crate new window for login interface
  createWindow("login");
  //close the main window
  mainWindow.close();
});

//----------------------------------------------------------
// a function for handel all create window
//----------------------------------------------------------
function createWindow(name) {
  switch (name) {
    case "login":
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
          pathname: path.join(__dirname, "/../public/login.html"),
          protocol: "file:",
          slashes: true,
        })
      );
      break;
    case "main":
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
          pathname: path.join(__dirname, "/../public/mainWindow.html"),
          protocol: "file:",
          slashes: true,
        })
      );
      break;
  }
}
