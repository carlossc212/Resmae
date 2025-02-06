// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from "electron";
import { addProduct } from "./database";

contextBridge.exposeInMainWorld("electronAPI", {
    generateInvoice: (filename: string) => ipcRenderer.invoke("generate-invoice", filename),
    addProduct: (name: string, description: string, price: number) => ipcRenderer.invoke('add-product', { name, description, price }),
    onaddproduct: (callback: (error: Error | null) => void) => ipcRenderer.on('product-added', (_, error) => callback(error))
});