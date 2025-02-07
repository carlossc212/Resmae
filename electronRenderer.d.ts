// electron.d.ts
export {};

declare global {
  interface Window {
    electronAPI: {
        generateInvoice: (filename:string) => Promise<void>;
        addProduct: (name: string, description: string, price: number) => Promise<void>;
        getProducts: () => Promise<{id: number, name: string, description: string, price: number}[]>;
    }
  }
}