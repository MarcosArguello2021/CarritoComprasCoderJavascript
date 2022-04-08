/*Se trata de simular una venta de vinos. Utilicé la clase "Producto" para crear los vinos. 
Utlicé el contructor de Productos para crear manualmente 5 vinos. Agregue Array "Catalogo" los vinos 
creados. En el menu del alert recorrí el Array de Catalogo. Se agregó un filtro de precios.  
*/

class Producto {
    constructor(nombre, cantidad, precio) {
        this.nombre = nombre.toUpperCase();
        this.cantidad = parseInt(cantidad);
        this.precio = parseFloat(precio);
    }

    incluirIva(tipo) {
        if (tipo == "electronica") {
            this.precio = this.precio * 1, 105;
        } else {
            this.precio = this.precio * 1, 21;
        }
    }

}

let totalCompra = 0;
let opcion;
const catalogo = [];

catalogo.push(new Producto("Vino Espumante", 10, 1500));
catalogo.push(new Producto("Vino Organico", 15, 900));
catalogo.push(new Producto("Vino Malbec", 5, 350));
catalogo.push(new Producto("Vino Blanco", 5, 450));
catalogo.push(new Producto("Vino", 3, 150));


function mostarCatalogo(opcion) {
    data = '';
    for (let i = catalogo.length - 1; i >= 0; i--) {
        data = ('(' + i + ') Nombre: ' + catalogo[i].nombre + " | Precio" + catalogo[i].precio + '\n') + data;
    }
    opcion = parseInt(prompt("Seleccione el vino a comprar: \n -----Lista de Productos:-----\n" + data + "(99) Presione 99 para salir\n"));
    return opcion;
}

function comprar(totalCompra, catalogo) {
    let seleccion;
    do {
        seleccion = mostarCatalogo(opcion);
        if (seleccion == 99) {
            seleccion = "S";
        } else if (catalogo.indexOf(seleccion)) {
            totalCompra += catalogo[seleccion].precio;
            mostrarSaldo(totalCompra);
        }

    } while (seleccion != "S");

    return totalCompra;
}

const mostrarSaldo = (totalCompra) => {
    alert("El valor actual de la compra es de : $ " + totalCompra);
};

function menorQue(valor) {
    const menor = catalogo.filter(element => element.precio < valor);

    console.log(menor);
}

do {
    opcion = parseInt(
        prompt(
            "Elija la opcion deseada\n1- Ver total actual de la Compra \n2- Comprar\n3- Filtrar por precio \n4- Salir"
        )
    );
    switch (opcion) {
        case 1:
            mostrarSaldo(totalCompra);
            break;
        case 2:
            totalCompra = (comprar(totalCompra, catalogo));
            break;
        case 3:
            menorQue(prompt("ingrese un precio"));
            break;
        case 4:
            alert("Salió del sistema");
            opcion = "S"
            break;
        default:
            alert("El valor ingresado es incorrecto");
            break;
    }
} while (opcion != "S");

alert("Se terminó la ejecución");


