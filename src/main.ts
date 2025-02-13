import { app, BrowserWindow, screen, ipcMain } from 'electron';
import path from 'node:path';
import started from 'electron-squirrel-startup';
import { generateInvoice } from './util/DocGenerator';
import { addProduct, getProducts, deleteProduct, addStockToStorage } from './util/database';

if (started) {
  app.quit();
}

const createWindow = () => {
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workAreaSize;

  const mainWindow = new BrowserWindow({
    width: 1000,
    height: 700,
    x: primaryDisplay.bounds.x + (width - 1000) / 2,
    y: primaryDisplay.bounds.y + (height - 700) / 2,
    webPreferences: {
      webSecurity: true, // Bloquea la carga de scripts externos
      allowRunningInsecureContent: false, // Evita contenido inseguro
      nodeIntegration: false, // Deshabilita acceso a Node.js en el renderer
      contextIsolation: true, // Asegura que el contexto del renderer esté aislado
      preload: path.join(__dirname, 'preload.js'),
      devTools: false,
    },
  });
  
  mainWindow.on("close", (event) => {
    event.preventDefault(); // Evita el cierre inmediato
    mainWindow.webContents.send("show-exit-dialog"); // Envía evento al renderer
  });

  mainWindow.menuBarVisible = false;
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);     
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  ipcMain.handle('generate-invoice', (_, filename)=>{generateInvoice(filename)});

  ipcMain.handle('add-product', (_, product) => {
    return addProduct({name: product.name, description: product.description, price: product.price, stock: product.stock});
  });

  ipcMain.handle('get-products', async () => {
    try {
      const products = await getProducts();
      return products;
    } catch (error) {
      console.error(error);
    }
  });

  ipcMain.handle('delete-product', (_, id) => {
    return deleteProduct(id);
  });

  ipcMain.handle('get-storage-items', async () => {
    try {
      const storageItems = await getProducts();
      return storageItems;
    } catch (error) {
      console.error(error);
    }
  });
  
  ipcMain.handle('add-stock-to-storage', (_, { productId, stock }) => {
    return addStockToStorage(productId, stock);
  });
};

// No necesita ejecutarse al iniciar el sistema, evita que se autoagregue.
app.setLoginItemSettings({
  openAtLogin: false,
  openAsHidden: false
});

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});