document.addEventListener("DOMContentLoaded", () => {
    console.log("hi");
  setTimeout(() => {
    console.log("hi");
    document.querySelector("#intro").remove();
  }, 2000);
});

function openCity(cityName) {
  var i;
  var x = document.getElementsByClassName("city");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  document.getElementById(cityName).style.display = "block";
}
