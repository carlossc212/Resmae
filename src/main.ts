import { app, BrowserWindow, screen, ipcMain } from 'electron';
import path from 'node:path';
import started from 'electron-squirrel-startup';
import { generateInvoice } from './util/DocGenerator';
import { initializeDatabase, addProduct, getProducts, deleteProduct, getStorageItems, addAmountToStorage } from './database';

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

  initializeDatabase(mainWindow);

  mainWindow.menuBarVisible = false;
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);     
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  ipcMain.handle('generate-invoice', (_, filename)=>{generateInvoice(filename)});

  ipcMain.handle('add-product', (_, product) => {
    return addProduct(product.name, product.description, product.price);
  });

  ipcMain.handle('get-products', async () => {
    try {
      const products = await getProducts();
      return products;
    } catch (error) {
      throw error;
    }
  });

  ipcMain.handle('delete-product', (_, id) => {
    return deleteProduct(id);
  });

  ipcMain.handle('get-storage-items', async () => {
    try {
      const storageItems = await getStorageItems();
      return storageItems;
    } catch (error) {
      throw error;
    }
  });
  
  ipcMain.handle('add-amount-to-storage', (_, { productId, amount }) => {
    return addAmountToStorage(productId, amount);
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