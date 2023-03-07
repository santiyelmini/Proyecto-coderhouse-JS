

const productos = [
    {
        id: "Ryzen-3-1200",
        nombre: "Ryzen 3 1200",
        imagen: "../assets/img/Ryzen_3_1200.jpg",
        precio: 22500,
    },
    {
        id: "Ryzen-5-1400",
        nombre: "Ryzen 5 1400",
        imagen: "../assets/img/Ryzen_5_1400.jpg",
        precio: 34500,
    },
    {
        id: "Ryzen-5-3600X",
        nombre: "Ryzen 5 3600X",
        imagen: "../assets/img/Ryzen_5_3600X.jpg",
        precio: 51294,
    },
    {
        id: "Ryzen-7-1700X",
        nombre: "Ryzen 7 1700X",
        imagen: "../assets/img/Ryzen_7_1700X.jpg",
        precio: 82194,
    },
    {
        id: "Ryzen-9-3900X",
        nombre: "Ryzen 9 3900X",
        imagen: "../assets/img/Ryzen_9_3900X.jpg",
        precio: 102794,
    },
    {
        id: "Radeon-RX-570-RS",
        nombre: "AMD RX 570 RS",
        imagen: "../assets/img/AMD_Radeon_RX_570_RS.jpg",
        precio: 45320,
    },
    {
        id: "Msi-Geforce-GTX-1650-Super",
        nombre: "Msi GTX 1650 Super",
        imagen: "../assets/img/MSI_GeForce_GTX_1650_Super_Gaming_X.jpg",
        precio: 34814,
    },
    {
        id: "MSI-GeForce-RTX-2070-SUPER",
        nombre: "Msi GTX 1650 Super",
        imagen: "../assets/img/MSI_GeForce_RTX_2070_SUPER.jpg",
        precio: 113300,
    },
    {
        id: "MSI-GeForce-RTX-3080",
        nombre: "Msi Rtx 3080 Gaming Trio",
        imagen: "../assets/img/MSI_GeForce_RTX_3080_GAMING_X_TRIO.jpg",
        precio: 143994,
    },
    {
        id: "AMD-Radeon-RX-550",
        nombre: "AMD Radeon RX 550",
        imagen: "../assets/img/AMD_Radeon_RX_550.jpg",
        precio: 19982,
    },
    {
        id: "Intel-Core-i5-8600K",
        nombre: "Intel Core i5 8600K",
        imagen: "../assets/img/Intel_Core_i5-8600K.jpg",
        precio: 59740,
    },
    {
        id: "Intel-Core-i7-8700K",
        nombre: "Intel Core i7 8700K",
        imagen: "../assets/img/Intel_Core_i7-8700K.jpg",
        precio: 62830,
    },
    {
        id: "Intel-Core-i9-9900K",
        nombre: "Intel Core i9 9900K",
        imagen: "../assets/img/Intel_Core_i9-9900K.jpg",
        precio: 78074,
    },
    {
        id: "Prime-X570-Pro",
        nombre: "Prime X570 Pro",
        imagen: "../assets/img/Prime_X570-Pro.jpg",
        precio: 28016,
    },
    {
        id: "ROG-Crosshair-VIII",
        nombre: "ROG Crosshair VIII",
        imagen: "../assets/img/ROG_Crosshair_VIII_Hero.jpg",
        precio: 73954,
    },
    {
        id: "TUF-X470-Plus-Gaming",
        nombre: "TUF X470 Plus Gaming",
        imagen: "../assets/img/TUF_X470-Plus_Gaming.jpg",
        precio: 34814,
    },
    {
        id: "ROG-Strix-X570",
        nombre: "ROG Strix X570",
        imagen: "../assets/img/ROG_Strix_X570-F_Gaming.jpg",
        precio: 61594,
    },
];


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

  if (productosFiltrados.length === 0) {
    mensajeBusqueda.textContent = "No hay resultados";
  } else {
    mensajeBusqueda.textContent = `Mostrando resultados de: ${valorBuscar}`;
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