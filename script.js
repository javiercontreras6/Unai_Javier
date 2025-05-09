let carrito = [];

function toggleCarrito() {
  document.getElementById('carrito-panel').classList.toggle('abierto');
}

function agregarAlCarrito(nombre, precio, talla) {
  const key = `${nombre} (${talla})`;
  const item = carrito.find(p => p.key === key);
  if (item) {
    item.cantidad++;
  } else {
    carrito.push({ key, nombre, talla, precio, cantidad: 1 });
  }
  actualizarCarrito();
}

function eliminarDelCarrito(index) {
  if (carrito[index].cantidad > 1) {
    carrito[index].cantidad--;
  } else {
    carrito.splice(index, 1);
  }
  actualizarCarrito();
}

function actualizarCarrito() {
  const lista = document.getElementById('lista-carrito');
  const totalSpan = document.getElementById('total');
  const contador = document.getElementById('contador');

  lista.innerHTML = '';
  let total = 0;
  let cantidadTotal = 0;

  carrito.forEach((item, index) => {
    total += item.precio * item.cantidad;
    cantidadTotal += item.cantidad;
    const li = document.createElement('li');
    li.innerHTML = `${item.nombre} (${item.talla}) x${item.cantidad} - €${(item.precio * item.cantidad).toFixed(2)} <button onclick="eliminarDelCarrito(${index})">-</button>`;
    lista.appendChild(li);
  });

  if (carrito.length === 0) {
    lista.innerHTML = '<li>Carrito vacío</li>';
  }

  totalSpan.textContent = total.toFixed(2);
  contador.textContent = cantidadTotal;
}

function comprar() {
  if (carrito.length === 0) {
    alert("Tu carrito está vacío.");
    return;
  }
  alert("¡Gracias por tu compra!");
  carrito = [];
  actualizarCarrito();
  toggleCarrito();
}