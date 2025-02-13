// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
    generateInvoice: (filename: string) => ipcRenderer.invoke("generate-invoice", filename),
    addProduct: (name: string, description: string, price: number, stock=0) => ipcRenderer.invoke('add-product', { name, description, price, stock }),
    getProducts: () => ipcRenderer.invoke('get-products'),
    deleteProduct: (id: string) => ipcRenderer.invoke('delete-product', id),
    addStockToStorage: (productId: string, stock: number) => ipcRenderer.invoke('add-stock-to-storage', { productId, stock }),
    onExitRequest: (callback: () => void) => ipcRenderer.on("show-exit-dialog", callback)
});