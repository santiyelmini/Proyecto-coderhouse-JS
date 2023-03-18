
let productos = [];

async function obtenerProductos() {
    const response = await fetch("./js/productos.json");
    const data = await response.json();
    productos = data;
    mostrarProductos(productos);
}

obtenerProductos();

const productosContenedor = document.querySelector(".productos-contenedor")
let botonesAgregar = document.querySelectorAll(".boton-agregar")
const carritoNumero = document.querySelector(".carrito-numero")

function mostrarProductos() {
    productos.forEach((producto) => {
        const productoElemento = document.createElement("div")
        productoElemento.classList.add("producto")
        productoElemento.innerHTML = `            
        <img class="producto-imagen" src="${producto.imagen}">
        <div class="producto-info">
            <span class="producto-nombre">${producto.nombre}</span>
            <span class="producto-precio">$${producto.precio}</span>
            <button class="boton-agregar" id="${producto.id}">
                <i class='bx bx-cart-alt'></i>
                Agregar
            </button>
        </div>`;
        productosContenedor.append(productoElemento);
    })
    botonesActualizar()
}
mostrarProductos()

let productosEnCarritoLS = JSON.parse(localStorage.getItem("carrito"))
if(productosEnCarritoLS) {
    carrito = productosEnCarritoLS;
    actualizarNumeroCarrito();
}else {
    carrito = [];
}

function agregarAlCarrito(evento) {
    Toastify({
        text: "Producto agregado al carrito",
        duration: 1000,
        newWindow: true,
        close: false,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        offset: {
            x: "10px"
        },
        style: {
          background: "linear-gradient(to right, #FFA500, #f7b945)",
        },
        onClick: function(){} // Callback after click
    }).showToast();
    const idProducto = evento.target.id
    const productoElegido = productos.find((producto) => producto.id === idProducto)
    if(carrito.some(producto => producto.id === idProducto)) {
        const index = carrito.findIndex(producto => producto.id === idProducto);
        carrito[index].cantidad++;
    }else {
        productoElegido.cantidad = 1;
        carrito.push(productoElegido)
    }
    actualizarNumeroCarrito()
    localStorage.setItem("carrito", JSON.stringify(carrito))
}

function botonesActualizar() {
    botonesAgregar = document.querySelectorAll(".boton-agregar")
    botonesAgregar.forEach((boton) => {
        boton.addEventListener("click", agregarAlCarrito)
    })
}


function actualizarNumeroCarrito() {
    let numeroAcumulador = carrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    carritoNumero.innerText = numeroAcumulador;
}


const mensajeBusqueda = document.querySelector(".seccion-titulo");
const formularioBuscar = document.querySelector(".buscar-producto");
formularioBuscar.addEventListener("submit", buscarProducto);

function buscarProducto(evento) {
    evento.preventDefault();
    const inputBuscar = document.querySelector(".buscar-input");
    const valorBuscar = inputBuscar.value.trim().toLowerCase();
    const productosFiltrados = productos.filter((producto) =>
      producto.nombre.toLowerCase().includes(valorBuscar)
    );
    productosContenedor.innerHTML = "";
    
    const mensaje = valorBuscar ? `Mostrando resultados de: ${valorBuscar}` : "Todos los productos";

    mensajeBusqueda.textContent = mensaje;
    if (productosFiltrados.length === 0) {
      mensajeBusqueda.textContent = "No hay resultados";
    } else {
    productosFiltrados.forEach((producto) => {
        const productoElemento = document.createElement("div");
        productoElemento.classList.add("producto");
        productoElemento.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}">
            <div class="producto-info">
                <span class="producto-nombre">${producto.nombre}</span>
                <span class="producto-precio">$${producto.precio}</span>
                <button class="boton-agregar" id="${producto.id}">
                    <i class='bx bx-cart-alt'></i>
                    Agregar
                </button>
            </div>`;
        productosContenedor.append(productoElemento);
    });
    botonesActualizar();
    }
}