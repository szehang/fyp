const electron = require("electron");
const config = require("../config");
const url = require("url");
const path = require("path");

const { app, BrowserWindow, ipcMain } = electron;

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
    createWindow('main');
    //close the login window
    loginWindow.close();
  } else {
    //console log on server side for testing.
    console.log("login failed.");

    //if else send error to loginWindow.webContents.send("login:error");
    loginWindow.webContents.send("login:error");
  }
});

//handel signup:send request from register.js
ipcMain.on("signup:send", function (e) {
  console.log("signup data received!");

  //handel request ...

  success = true;
  //redirect back to sign up
  if (success) {
    //crate new window for login interface
    createWindow('login');
    //close the main window
    registerWindow.close();
  } else {
    //if else send error to registerWindow.webContents.send("signup:error");
    registerWindow.webContents.send("signup:error");
  }
});

//----------------------------------------------------------
// redirect section
//----------------------------------------------------------
//listen for logout:send event from mainWindow.js
ipcMain.on("logout:send", function (e) {
  //crate new window for login interface
  createWindow('login');
  //close the main window
  mainWindow.close();
});

//listen for signup page request
ipcMain.on("signup:request", function (e) {
  //crate new window for register
  createWindow('register');
  //close the login window
  loginWindow.close();
});

//listen for back to login page request
ipcMain.on("signup:back", function (e) {
  //crate new window for login
  createWindow('login');
  //close the login window
  registerWindow.close();
});


//handel all create window function
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
    case "register":
      //crate new window for register
      registerWindow = new BrowserWindow({
        width: 400,
        height: 600,
        webPreferences: {
          //enable client side .js can use require node.js
          nodeIntegration: true,
        },
      });
      //load html into window
      registerWindow.loadURL(
        url.format({
          pathname: path.join(__dirname, "/../public/register.html"),
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
