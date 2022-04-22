///Eventos
const openBtn = document.getElementById("carrito")
const sideBarWrapper = document.querySelector("div.side-bar-wrapper");

openBtn.addEventListener("click", function () {
  sideBarWrapper.style.width = "100vw";
  document.querySelector("#side-bar").style.width = "400px";
});

const closeBtn = document.querySelector("#close-cart");

closeBtn.addEventListener("click", function () {
  sideBarWrapper.style.width = "0vw";
  document.querySelector("#side-bar").style.width = "0px";
});

sideBarWrapper.addEventListener("click", function (e) {
  sideBarWrapper.style.width = "0vw";
  document.querySelector("#side-bar").style.width = "0px";
});
document.querySelector("#side-bar").addEventListener("click", function (e) {
  e.stopPropagation();
});

