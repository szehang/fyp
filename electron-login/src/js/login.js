const electron = require("electron");
const { ipcRenderer } = electron;

const submitForm = document.getElementById("login");

//add action listener when form is submitted
submitForm.addEventListener("submit", function(e){
    //disable actually submit the form
    e.preventDefault();

    account = document.getElementById("account").value;
    password = document.getElementById("password").value;
    //send the account and password to the main.js
    ipcRenderer.send("login:send", account, password);
})