const carrito = [];

function agregarCarrito(producto, precio) {

    precio = Number(precio);

    carrito.push({
        producto,
        precio
    });

    actualizarCarrito();
}

function actualizarCarrito() {

    const lista = document.getElementById('lista-carrito');

    lista.innerHTML = "";

    let total = 0;

    carrito.forEach((item, index) => {

        total += item.precio;

        const li = document.createElement('li');

        li.innerHTML = `
            ${item.producto} - $${item.precio}

            <button onclick="eliminarProducto(${index})">
                Eliminar
            </button>
        `;

        lista.appendChild(li);
    });

    document.getElementById('total').innerText =
        `Total: $${total}`;
}

function eliminarProducto(index) {

    carrito.splice(index, 1);

    actualizarCarrito();
}

function realizarCompra() {

    if(carrito.length === 0){

        alert("El carrito está vacío");

        return;
    }

    generarFacturaPDF();

    carrito.length = 0;

    actualizarCarrito();

    alert("Compra realizada correctamente");
}

function generarFacturaPDF() {

    const { jsPDF } = window.jspdf;

    const doc = new jsPDF();

    doc.setFontSize(20);

    doc.text("Factura Baseball Store", 20, 20);

    let y = 40;

    let total = 0;

    carrito.forEach((item) => {

        doc.text(
            `${item.producto} - $${item.precio}`,
            20,
            y
        );

        total += item.precio;

        y += 10;
    });

    doc.text(`Total: $${total}`, 20, y + 20);

    doc.save("factura.pdf");
}