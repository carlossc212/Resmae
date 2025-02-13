// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
    generateInvoice: (filename: string) => ipcRenderer.invoke("generate-invoice", filename),
    addProduct: (name: string, description: string, price: number) => ipcRenderer.invoke('add-product', { name, description, price }),
    getProducts: () => ipcRenderer.invoke('get-products'),
    deleteProduct: (id: number) => ipcRenderer.invoke('delete-product', id),
    getStorageItems: () => ipcRenderer.invoke('get-storage-items'),
    addAmountToStorage: (productId: number, amount: number) => ipcRenderer.invoke('add-amount-to-storage', { productId, amount }),
    onExitRequest: (callback: () => void) => ipcRenderer.on("show-exit-dialog", callback),
    requestExitDialog: () => ipcRenderer.send("request-exit-dialog")
});