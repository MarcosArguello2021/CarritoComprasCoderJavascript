//Array para guardar los productos creados manualmente
let productos = [];

//Hacemos un fetch para obtener los productos almacenados en un archivo JSON 
fetch("http://localhost:5500/js/catalogo.json")
  .then((res) => res.json())
  .then((data) => {
    productos = data;
    localStorage.setItem("Catalogo", JSON.stringify(productos));
  });

//Variables
const cartContainer = document.querySelector("#cart"); //Contenedor Carrito
const contadorCarrito = document.querySelector("#cart-counter");//Contador Carrito

///Carga de la app:
let categoria = window.location.href;
if (categoria.match("variedad=BLEND")) {
  let arrayFiltrado = filtrarVariedad("BLEND")
  crearCards(arrayFiltrado);
} else if (categoria.match("variedad=TINTOS")) {
  let arrayFiltrado = filtrarVariedad("TINTOS")
  crearCards(arrayFiltrado);
} else if (categoria.match("variedad=BLANCOS")) {
  let arrayFiltrado = filtrarVariedad("BLANCOS")
  crearCards(arrayFiltrado);
} else if (categoria.match("variedad=ESPUMANTES")) {
  let arrayFiltrado = filtrarVariedad("ESPUMANTES")
  crearCards(arrayFiltrado);
} else if (categoria.match("variedad=ORGANICOS")) {
  let arrayFiltrado = filtrarVariedad("ORGANICOS")
  crearCards(arrayFiltrado);
} else {
  crearCards(JSON.parse(localStorage.getItem("Catalogo")));
}
//Reviso la existencia del carrito de compras al iniciar
let carritoDelLocal = JSON.parse(localStorage.getItem("Carrito")); 
if (carritoDelLocal) {
  actualizarCarrito(carritoDelLocal);
} else {
  localStorage.setItem("Carrito", "[]");
}
document.querySelector("#clear").addEventListener("click", eliminarCarrito);

const getValueInput = () => {
  let inputValue = document.getElementById("input-search").value;
  console.log(inputValue);
  let filtrados = buscarNombre(inputValue);
  crearCards(filtrados);
}

//Filtrar pot variedad vino
function filtrarVariedad(variedad) {
  let arrayProductos = JSON.parse(localStorage.getItem("Catalogo"));
  let arrayFiltrado = arrayProductos.filter(el => el.variedad == variedad);
  return arrayFiltrado;
}

//Buscar por nombre vino
function buscarNombre(busqueda) {
  let arrayProductos = JSON.parse(localStorage.getItem("Catalogo"));
  let arrayFiltrado = arrayProductos.filter(arrayProductos => arrayProductos.nombre.includes(busqueda));
  return arrayFiltrado;
}

//Agregar al carrito:
function agregarProducto(id, stock) {
  let catalogoLocal = JSON.parse(localStorage.getItem("Catalogo"));
  let carritoLocal = JSON.parse(localStorage.getItem("Carrito"));
  if (carritoLocal.find((item) => item.id == id)) {
    let productoClickeado = carritoLocal.find((item) => item.id == id);
    productoClickeado.cantidad = productoClickeado.cantidad + stock;
    carritoLocal[productoClickeado.id.value] = productoClickeado;
  } else {
    let productoClickeado = catalogoLocal.find((item) => item.id == id);
    productoClickeado.cantidad = productoClickeado.cantidad + stock;
    carritoLocal.push(productoClickeado);
  }
  localStorage.setItem("Carrito", JSON.stringify(carritoLocal)); // Convierto el array a string y lo envio al local storage.
  actualizarCarrito(carritoLocal);
}

//Actuliza la vista del carrito según los cambios.
function actualizarCarrito(local) {
  cartContainer.innerHTML = ""; //Limpio el contenedor, para no dublicar cards.
  for (const productoAgregado of local) {
    cartContainer.innerHTML += ` <div class="d-flex justify-content-between align-items-center mt-3 p-4 items rounded border-bottom border-top" >
    <img class="rounded border" src=${productoAgregado.img} width="100">
        <div class="ml-2"><span class="font-weight-bold d-block m-2">${productoAgregado.nombre}</span><span class="d-block ml-5 font-weight-bold" id=precioUnitario>Precio Unitario: $${(new Intl.NumberFormat('es-AR').format(productoAgregado.precio))}</span></div>
        <div class="ml-2"></span><span class="d-block ml-5 font-weight-bold">Cantidad: ${productoAgregado.cantidad}</span><span class="d-block"></div>
        <span class="eliminar-item" id="#${productoAgregado.id}"><i class="fa fa-trash" aria-hidden="true"></i> </span>
</div>`;
    let btnsEliminar = document.querySelectorAll(".eliminar-item");

    for (const btn of btnsEliminar) {
      btn.addEventListener("click", eliminarProducto);
    }
  }
  contadorCarrito.innerText = local.length; /// Actualizamos el contador del carrito
  document.querySelector("#total").innerText = sumarTotal(local);
}

//Elimino un producto especifico del carrito.
function eliminarProducto() {
  let arrayLocal = JSON.parse(localStorage.getItem("Carrito"));
  let productoEliminado = arrayLocal.find((item) => `#${item.id}` === this.id);
  let indiceDeProducto = arrayLocal.indexOf(productoEliminado);
  arrayLocal.splice(indiceDeProducto, 1);
  localStorage.setItem("Carrito", JSON.stringify(arrayLocal)); // Actualizamos el local.
  actualizarCarrito(arrayLocal);
}

//Creamos las cards de los productos.
// Recorremos el array productos y se crea una card con las propiedades de cada objeto.
function crearCards(productos) {
  if (document.getElementById("cards")) {
    document.querySelector("#cards").innerHTML = "";
  }
  productos.forEach(items => {
    let cardNueva = document.createElement('div');; // Creo un elemento nuevo.
    cardNueva.classList.add("card", "col-4", "m-3", "item-rounded", "box-rounded");

    const imgProducto = document.createElement("img");
    imgProducto.classList.add("imgProducto", "card-img-top", "border");
    imgProducto.src = "../" + items.img;

    const nombre = document.createElement("h5");
    nombre.classList.add("card-title");
    nombre.textContent = items.nombre;

    const variedad = document.createElement("h6");
    variedad.classList.add("card-title");
    variedad.textContent = items.variedad;

    const divBotones = document.createElement("div");
    divBotones.classList.add("card-button-cantidad")

    const btnDisminuir = document.createElement("button");
    btnDisminuir.classList.add("btn-disminuir");
    btnDisminuir.textContent = "-";
    btnDisminuir.onclick = () => {
      if (cantidad1.value > 1)
        cantidad1.value = parseInt(cantidad1.value) - 1;
    }

    const cantidad1 = document.createElement("input");
    cantidad1.classList.add("inputCantidad");
    cantidad1.value = 1;

    const btnAumentar = document.createElement("button");
    btnAumentar.classList.add("btn-aumentar");
    btnAumentar.textContent = "+";
    btnAumentar.onclick = () => {
      cantidad1.value = parseInt(cantidad1.value) + 1;
    }
    divBotones.appendChild(btnDisminuir);
    divBotones.appendChild(cantidad1);
    divBotones.appendChild(btnAumentar);
    const divCardBody = document.createElement("div");
    divCardBody.classList.add("card-body", "text-center");

    const precio = document.createElement("p");
    precio.classList.add("card-text");
    precio.textContent = ("$ " + (new Intl.NumberFormat('es-AR').format(items.precio)));

    const btnAgregarCarrito = document.createElement("button");
    btnAgregarCarrito.classList.add("third", "add");
    btnAgregarCarrito.textContent = "Añadir al carrito";
    btnAgregarCarrito.onclick = () => {
      let stock = parseInt(cantidad1.value);
      agregarProducto(items.id, stock);
      swal({
        title: "Producto Agregado al Carrito",
        text: "Vino: " + items.nombre + ". Cantidad: " + stock,
        icon: "success",
        button: "OK",
      });

    };
    cardNueva.appendChild(imgProducto);
    cardNueva.appendChild(nombre);
    cardNueva.appendChild(variedad);
    cardNueva.appendChild(divBotones);
    cardNueva.appendChild(divCardBody);
    cardNueva.appendChild(precio);
    cardNueva.appendChild(btnAgregarCarrito);

    if (document.getElementById("cards")) {
      document.getElementById("cards").append(cardNueva);
    }
  });
}

//Sumar total carrito
function sumarTotal(cart) {
  let total = cart.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);
  return (new Intl.NumberFormat('es-AR').format(total));
}

//Elimino el carrito completo
function eliminarCarrito() {
  document.querySelector("#cart").innerHTML = "";
  localStorage.setItem("Carrito", "[]");
  document.querySelector("#cards").innerHTML = "";
  crearCards(JSON.parse(localStorage.getItem("Catalogo")));
  document.querySelector("#cart-counter").innerText = "0";
  document.querySelector("#total").innerText = "0";
}



