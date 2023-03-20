

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
            </div>
            <i class='bx bxs-trash boton-eliminar' id="${producto.id}">`;
            carritoProductosDom.append(div);
        });
    } else {
        carritoVacioMensaje.classList.remove("oculto");
        carritoDom.classList.add("oculto");
        carritoCompradoMensaje.classList.add("oculto")
    }
    actualizarTotal();
    actualizarBotonesEliminar();
}
mostrarProductosCarrito()


function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".boton-eliminar");
    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}

function eliminarDelCarrito(evento) {
    Toastify({
        text: "Producto eliminado",
        duration: 1000,
        newWindow: true,
        close: false,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        offset: {
            x: "25px"
        },
        style: {
            background: "linear-gradient(to right, #FFA500, #f7b945)",
        },
        onClick: function(){}
    }).showToast();
    const id = evento.target.getAttribute("id");
    const index = productosEnCarrito.findIndex(producto => producto.id === id);
    productosEnCarrito.splice(index, 1);
    localStorage.setItem("carrito", JSON.stringify(productosEnCarrito));
    mostrarProductosCarrito();
}

function actualizarTotal() {
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    totalCarrito.innerText = `Total: $${totalCalculado}`;
}

vaciarCarritoBoton.addEventListener("click", vaciarCarrito)
function vaciarCarrito() {
    Swal.fire({
        title: '¿Estas seguro?',
        icon: 'question',
        html:
          `Se van a borrar ${productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0)} productos.`,
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText:
          'Sí',
        confirmButtonAriaLabel: 'Thumbs up, great!',
        cancelButtonText:
          'No',
        cancelButtonAriaLabel: 'Thumbs down'
    }).then((result) => {
        if (result.isConfirmed) {
            productosEnCarrito.length = 0;
            localStorage.setItem("carrito", JSON.stringify(productosEnCarrito));
            mostrarProductosCarrito();
        }
    })
}

comprarCarritoBoton.addEventListener("click", comprarCarrito)
function comprarCarrito() {
    productosEnCarrito.length = 0;
    localStorage.setItem("carrito", JSON.stringify(productosEnCarrito));
    mostrarProductosCarrito();
    carritoCompradoMensaje.classList.remove("oculto")
    carritoVacioMensaje.classList.add("oculto")
}
