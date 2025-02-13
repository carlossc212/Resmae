export {};

declare global {
  interface Window {
    electronAPI: {
        generateInvoice: (filename:string) => Promise<void>;
        addProduct: (name: string, description: string, price: number, stock?: number) => Promise<void>;
        getProducts: () => Promise<{_id: string, cod: number, name: string, description: string, price: number, stock: number}[]>;
        deleteProduct: (id: string) => Promise<void>;
        addStockToStorage: (productId: string, stock: number) => Promise<void>;
        onExitRequest: (callback: () => void) => void;
    }
  }
}