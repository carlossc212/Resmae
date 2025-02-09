// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
    generateInvoice: (filename: string) => ipcRenderer.invoke("generate-invoice", filename),
    addProduct: (name: string, description: string, price: number) => ipcRenderer.invoke('add-product', { name, description, price }),
    getProducts: () => ipcRenderer.invoke('get-products'),
    deleteProduct: (id: number) => ipcRenderer.invoke('delete-product', id)
});