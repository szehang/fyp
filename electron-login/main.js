const electron = require("electron");
const url = require("url");
const path = require("path");

const { app, BrowserWindow } = electron;


app.on("ready", function () {
  mainWindow = new BrowserWindow({ width: 600, height: 400 });
  //load html into window
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "index.html"),
      protocol: "file:",
      slashes: true,
    })
  );
});
