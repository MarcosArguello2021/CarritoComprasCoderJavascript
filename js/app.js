//Objeto para modelar el catalogo

class Producto {
  ///Declaro la funcion constructora
  constructor(nombre, precio, id, img) {
    this.nombre = nombre;
    this.precio = precio;
    this.id = id;
    this.img = img;
    this.stock = "En stock";
  }
  //Metodos
  sinStock() {
    this.stock = "Sin Stock";
  }
  descuento(porcentaje) {
    this.precio = this.precio * porcentaje;
  }
  descuento10() {
    this.precio = this.precio * 0.9;
  }
}

//Array para guardar los productos creados manualmente
const productos = [];

productos.push(new Producto("Achaval Ferrer Malbec", 1200,1,"/img/catalogo/AchavalFerrer_Malbec.jpg"));
productos.push(new Producto("Alambrado rose",500,2,"/img/catalogo/Alambrado_rose.jpg"));
productos.push(new Producto("Alto las hormigas",900,3,"/img/catalogo/Alta_LasHormigas_Organic.jpg"));
productos.push(new Producto("Estiba reservada blend",21000,4,"/img/catalogo/Estiba_reservada_blend.jpg"));
productos.push(new Producto("Nicasia blanc ",1350,5,"/img/catalogo/Nicasia_blanc_.jpg"));
productos.push(new Producto("Salentein rose",800,6,"/img/catalogo/Salentein_rpse.jpg"));
console.dir(productos);

/////DOM
// Recorremos el array productos y se crea una card con las propiedades de cada objeto.
for (const producto of productos) {
  let cardNueva = document.createElement("div"); // Creo un elemento nuevo.
  cardNueva.innerHTML = ` 
  <img src= ${producto.img} class="card-img-top" alt="...">
  <h5 class="card-title">${producto.nombre}</h5>
  <div class="card-body text-center">
   
    <p class="card-text">$ ${producto.precio}</p>
    <button id="${producto.id}" class="  third">Añadir al carrito   <i class="fa fa-shopping-cart in-card" aria-hidden="true"></i> </button>
  </div>
  `; 

  document.getElementById("cards").append(cardNueva); //"pusheo" ese elemento a un div con id="cards", que se encuentra en mi index.html.

  cardNueva.classList.add("card", "col-4", "m-3"); //Le asigno una clase a ese nuevo div para darle estilos.
}

///Eventos
const openBtn = document.getElementById("carrito");
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
