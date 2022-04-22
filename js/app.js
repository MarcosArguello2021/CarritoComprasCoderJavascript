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


// Recorremos el array productos y se crea una card con las propiedades de cada objeto.
//Agregar al carrito:
const cartContainer = document.querySelector("#cart");
const contadorCarrito = document.querySelector("#cart-counter");


function agregarProducto(e) {
  e.target.setAttribute("disabled", true); // Desactivo el Boton.
  e.target.innerHTML = "Agregado"; // Cambio el Texto
  e.target.style.minWidth = "200px";
  let productoClickeado = productos.find((item) => item.id == e.target.id); // Encontramos el producto dentro del array
  let arrayLocal = JSON.parse(localStorage.getItem("Carrito"));
  arrayLocal.push(productoClickeado);
  localStorage.setItem("Carrito", JSON.stringify(arrayLocal)); // Convierto el array a string y lo envio al local storage.
  actualizarCarrito(arrayLocal);
  actualizarBotones(arrayLocal);
}

function actualizarCarrito(local) {
  cartContainer.innerHTML = ""; //Limpio el contenedor, para no dublicar cards.

  for (const productoAgregado of local) {
    cartContainer.innerHTML += ` <div class="d-flex justify-content-between align-items-center mt-3 p-4 items rounded border-bottom border-top" >
    <img class="rounded border" src=${productoAgregado.img} width="100">
        <div class="ml-2"><span class="font-weight-bold d-block m-2">${productoAgregado.nombre}</span><span class="d-block ml-5 font-weight-bold">$${productoAgregado.precio}</span></div>
        <div class="ml-2 rounded"> <span><i class="fa fa-minus " aria-hidden="true"></i> </span> <span class ="item-count rounded">1</span>  <span><i class="fa fa-plus rounded" aria-hidden="true"></i> </span>  </div>
        <span class="eliminar-item" id= "#${productoAgregado.id}"><i class="fa fa-trash" aria-hidden="true"></i> </span>
</div>`;
  }
  let btnsEliminar = document.querySelectorAll(".eliminar-item");

  for (const btn of btnsEliminar) {
    btn.addEventListener("click", eliminarProducto);
  }

  contadorCarrito.innerText = local.length; /// Actualizamos el contador del carrito

  document.querySelector("#total").innerText = sumarTotal(local);
}
function actualizarBotones(local) {
  const btns = document.querySelectorAll("button.third");

  for (const item of local) {
    for (const btn of btns) {
      if (item.id == btn.id) {
        let botonAdd = document.getElementById(`${item.id}`);
        botonAdd.setAttribute("disabled", true); // Desactivo el Boton.
        botonAdd.innerHTML = "Agregado"; // Cambio el Texto
        botonAdd.style.minWidth = "202px"; //Eso lo hago aca por que me dio fiaca modificarlo del CSS y ademas como ejemplo de modificar el CSS con eventos.
      }
    }
  }
}
function eliminarProducto() {
  let arrayLocal = JSON.parse(localStorage.getItem("Carrito"));
  let productoEliminado = arrayLocal.find((item) => `#${item.id}` === this.id);
  let productId = productoEliminado.id;
  let btnProducto = document.getElementById(productId);
  document.getElementById(productId).innerHTML = "agregar al carrito";

  btnProducto.disabled = false;
  // Aca podriamos utilizar un filter(), para sacar el producto, tal vez seria mas prolijo, pero para que vean mas metodos.
  let indiceDeProducto = arrayLocal.indexOf(productoEliminado); ///indexOf devuelve el indice del elemento en el array.

  arrayLocal.splice(indiceDeProducto, 1); // splice() elimina elementos, requiere dos parametros. El primero es el indice, y el segundo la cantidad de elementos que queres eliminar.

  localStorage.setItem("Carrito", JSON.stringify(arrayLocal)); // Actualizamos el local.

  actualizarCarrito(arrayLocal);
}

//SUMAR TOTAL
function sumarTotal(cart) {
  let total = cart.reduce((acc, item) => acc + item.precio, 0);
  return total;
}

function crearCards(productos) {
  for (const producto of productos) {
    let cardNueva = document.createElement("div"); // Creo un elemento nuevo.
    cardNueva.innerHTML = ` 
  <img src= ${producto.img} class="card-img-top border" alt="...">
  <h5 class="card-title">${producto.nombre}</h5>
  <div class="card-body text-center">
    <p class="card-text">$ ${producto.precio}</p>
    <button id="${producto.id}" class="third add">Añadir al carrito<i class="fa fa-shopping-cart in-card" aria-hidden="true"></i> </button>
  </div>
    `; //Le asigno el html mediante plantilla literal. **IMPORTANTE usar BACKTICKS (``)en vez de comillas regulares** .

    document.getElementById("cards").append(cardNueva); //"pusheo" ese elemento a un div con id="cards", que se encuentra en mi index.html.

    cardNueva.classList.add("card", "col-4", "m-3"); //Le asigno una clase a ese nuevo div para darle estilos.
  }

  //Agrego los eventos Click
  const btns = document.querySelectorAll(".add");
  for (const boton of btns) {
    boton.addEventListener("click", agregarProducto);
  }
}

 ///Carga de la app:

crearCards(productos);

let carritoDelLocal = JSON.parse(localStorage.getItem("Carrito")); //Realizo la llamada al local.

console.log(carritoDelLocal);

if (carritoDelLocal) {
  actualizarBotones(carritoDelLocal);

  actualizarCarrito(carritoDelLocal);
} else {
  localStorage.setItem("Carrito", "[]");
}

document.querySelector("#clear").addEventListener("click", eliminarCarrito);

function eliminarCarrito() {
  document.querySelector("#cart").innerHTML = "";
  localStorage.setItem("Carrito", "[]");
  document.querySelector("#cards").innerHTML = "";
  crearCards(productos);
  document.querySelector("#cart-counter").innerText = "0";
  document.querySelector("#total").innerText = "0";
}

