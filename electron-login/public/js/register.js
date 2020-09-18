const electron = require("electron");
const { ipcRenderer } = electron;

const signupForm = document.getElementById("signup");

//add action listener when form is submitted
signupForm.addEventListener("submit", function (e) {
  //disable actually submit the form
  e.preventDefault();

  account = document.getElementById("accountInput").value;
  password = document.getElementById("passwordInput").value;
  //send the account and password to the ipcmain.js
  ipcRenderer.send("signup:send", account, password);
});

//handel sign-up errors
ipcRenderer.on("signup:error", function (e) {
  //tell user login failed
  document.getElementById("signupStatus").innerHTML = "Sign up failed!";

  //reset the account and password input value
  document.getElementById("accountInput").value = "";
  document.getElementById("passwordInput").value = "";

  //select the account input
  document.getElementById("accountInput").select();
});

//handel sign-up success
ipcRenderer.on("signup:success", function (e) {
  alert('Your signup is successful!');
  window.location.href = 'login.html';
});
