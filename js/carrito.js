

const carritoDom = document.querySelector(".carrito-dom")
const carritoCompradoMensaje = document.querySelector(".carrito-comprado")
const carritoVacioMensaje = document.querySelector(".carrito-vacio")
const carritoProductosDom = document.querySelector(".carrito-productos")
const productosEnCarrito = JSON.parse(localStorage.getItem("carrito"))
const totalCarrito = document.querySelector(".total-carrito")
const vaciarCarritoBoton = document.querySelector(".vaciar-carrito")
const comprarCarritoBoton = document.querySelector(".boton-comprar")


function mostrarProductosCarrito() {
    if(productosEnCarrito && productosEnCarrito.length > 0) {
        carritoCompradoMensaje.classList.add("oculto")
        carritoDom.classList.remove("oculto");
        carritoVacioMensaje.classList.add("oculto");
        carritoProductosDom.innerHTML = "";
        productosEnCarrito.forEach((producto) => {
            const div = document.createElement("div");
            div.classList.add("carrito-item");
            div.innerHTML = ` 
            <img class="carrito-item-img" src="${producto.imagen}">
            <div class="carrito-item-section">
                <span class="section-title">Nombre</span>
                <span>${producto.nombre}</span>
            </div>
            <div class="carrito-item-section">
                <span class="section-title">Cantidad</span>
                <span>${producto.cantidad}</span>
            </div>
            <div class="carrito-item-section">
                <span class="section-title">Precio</span>
                <span>${producto.precio}</span>
            </div>
            <div class="carrito-item-section">
                <span class="section-title">Subtotal</span>
                <span>${producto.precio * producto.cantidad}</span>
            </div>`;
            carritoProductosDom.append(div);
        });
    } else {
        carritoVacioMensaje.classList.remove("oculto");
        carritoDom.classList.add("oculto");
        carritoCompradoMensaje.classList.add("oculto")
    }
    actualizarTotal();
}
mostrarProductosCarrito()


function actualizarTotal() {
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    totalCarrito.innerText = `$${totalCalculado}`;
}

vaciarCarritoBoton.addEventListener("click", vaciarCarrito)
function vaciarCarrito() {
    productosEnCarrito.length = 0;
    localStorage.setItem("carrito", JSON.stringify(productosEnCarrito));
    mostrarProductosCarrito();
}

comprarCarritoBoton.addEventListener("click", comprarCarrito)
function comprarCarrito() {
    productosEnCarrito.length = 0;
    localStorage.setItem("carrito", JSON.stringify(productosEnCarrito));
    mostrarProductosCarrito();
    carritoCompradoMensaje.classList.remove("oculto")
    carritoVacioMensaje.classList.add("oculto")
}