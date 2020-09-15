const electron = require("electron");
const { ipcRenderer } = electron;

function logout(){
    ipcRenderer.send("logout:send");
}