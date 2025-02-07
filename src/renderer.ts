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

  // Selecciona el botón que abre el diálogo y el diálogo mismo
addProductButton = document.querySelector(".add-product-button"),
productDialog = document.getElementById("productDialog") as HTMLDialogElement,
productForm = document.getElementById("productForm") as HTMLFormElement,

// Referencias a los campos del formulario
productNameInput = document.getElementById("productName") as HTMLInputElement,
productDescriptionInput = document.getElementById("productDescription") as HTMLInputElement,
productPriceInput = document.getElementById("productPrice") as HTMLInputElement;

document.addEventListener("dragstart", (event) => {
  event.preventDefault(); // Bloquea el arrastre de imágenes y otros elementos
});

exitButton.addEventListener("click", () => {
  window.close();
});

toggle.addEventListener("click", () => {
sidebar.classList.toggle("close");
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

searchBtn.addEventListener("click", () => {
  sidebar.classList.remove("close");
});

// Cuando se haga click en el botón, se abre el diálogo
addProductButton?.addEventListener("click", () => {
  productDialog.showModal();
});

// Manejar el evento "reset" para cerrar el diálogo al cancelar
productForm.addEventListener("reset", (event) => {
  productDialog.close();
});

// Maneja el envío del formulario
productForm.addEventListener("submit", async (event) => {
  // Obtén y valida los valores
  const name = productNameInput.value.trim();
  const description = productDescriptionInput.value.trim();
  const price = parseFloat(productPriceInput.value);

  try {
    // Llama a la función addProduct a través de electronAPI
    await window.electronAPI.addProduct(name, description, price);
    await updateProductsTable();
    productForm.reset();
    productDialog.close();
  } catch (error) {
    alert("Error al agregar el producto. Revisa la consola para más detalles.");
  }
});