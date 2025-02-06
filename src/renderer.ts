import './index.css';


document.querySelector('button')?.addEventListener('click', async () => {
    window.electronAPI.generateInvoice("invoice.pdf");
});
 
const body = document.querySelector("body"),
  sidebar = body.querySelector("nav"),
  toggle = body.querySelector(".toggle"),
  searchBtn = body.querySelector(".search-box"),
  exitButton = body.querySelector(".exit-button"),
  modeSwitch = body.querySelector(".toggle-switch"),
  modeText = body.querySelector(".mode-text") as HTMLElement,
  views = document.querySelectorAll(".view"),
  navLinks = document.querySelectorAll(".nav-link a"),
  addProductButton = body.querySelector(".add-product-button");

document.addEventListener("dragstart", (event) => {
  event.preventDefault(); // Bloquea el arrastre de imágenes y otros elementos
});

window.addEventListener('DOMContentLoaded', () => {
  updateProductsTable();
});

async function updateProductsTable() {
  try {
    const products: Array<{ id: number; name: string; description: string; price: number }> = await window.electronAPI.getProducts();
    
    const tbody = document.querySelector('.products-table tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    
    products.forEach(product => {
      const tr = document.createElement('tr');
      
      const tdId = document.createElement('td');
      tdId.innerText = product.id.toString();
      
      const tdName = document.createElement('td');
      tdName.innerText = product.name;
      
      const tdDesc = document.createElement('td');
      tdDesc.innerText = product.description;
      
      const tdPrice = document.createElement('td');
      tdPrice.innerText = `€${product.price.toFixed(2)}`;
      
      tr.appendChild(tdId);
      tr.appendChild(tdName);
      tr.appendChild(tdDesc);
      tr.appendChild(tdPrice);
      
      tbody.appendChild(tr);
    });
  } catch (error) {
    console.error('Error al actualizar la tabla de productos:', error);
  }
}

exitButton.addEventListener("click", () => {
    window.close();
});

toggle.addEventListener("click", () => {
  sidebar.classList.toggle("close");
});

searchBtn.addEventListener("click", () => {
  sidebar.classList.remove("close");
});

modeSwitch.addEventListener("click", () => {
  body.classList.toggle("dark");

  if (body.classList.contains("dark")) {
    modeText.innerText = "Modo oscuro";
  } else {
    modeText.innerText = "Modo claro";
  }
});

navLinks.forEach(link => {
    link.addEventListener("click", (event) => {
        event.preventDefault(); // Evita recargar la página

        // Obtener el ID de la vista desde el href del enlace
        const targetId = link.getAttribute("href").replace("#", "");

        // Ocultar todas las vistas
        views.forEach(view => view.classList.remove("active"));

        // Mostrar solo la vista seleccionada
        document.getElementById(targetId).classList.add("active");
    });
});

window.electronAPI.onaddproduct((_, error) => {
  if (error) {
    alert("Ha ocurrido un error al agregar el producto");
  } else {
    alert("Producto agregado correctamente");
    updateProductsTable();
  }
});

addProductButton.addEventListener("click", () => {
  window.electronAPI.addProduct("Pan", "Harina de trigo", 0.99)
});