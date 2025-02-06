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
        const targetId = link.getAttribute("href")?.replace("#", "");

        // Ocultar todas las vistas
        views.forEach(view => view.classList.remove("active"));

        // Mostrar solo la vista seleccionada
        document.getElementById(targetId!)?.classList.add("active");
    });
});

window.electronAPI.onaddproduct((_, error) => {
  if (error) {
    alert("Ha ocurrido un error al agregar el producto");
  } else {
    alert("Producto agregado correctamente");
  }
});

addProductButton.addEventListener("click", () => {
  
  window.electronAPI.addProduct("Pan", "Harina de trigo", 0.99)
});