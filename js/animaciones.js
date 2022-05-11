const openBtn = document.getElementById("carrito")
const sideBarWrapper = document.querySelector("div.side-bar-wrapper");

//Comportamiento del botón de carrito. Uso libreria sweetalert para mostrar cartel
openBtn.addEventListener("click", function () {
  if (JSON.parse(localStorage.getItem("Carrito")).length == 0) {
    swal({
      title: "Carrito Vacío",
      icon: "error",
      button: "OK",
    });
  }else{
    sideBarWrapper.style.width = "100vw";
    document.querySelector("#side-bar").style.width = "400px";
  }
  
});

//Variable manejar botón cierre carrito
const closeBtn = document.querySelector("#close-cart");

//Comportamiento al presionar botón de cerrar carrito
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

