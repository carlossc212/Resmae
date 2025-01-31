// electron.d.ts
export {};

declare global {
  interface Window {
    electronAPI: {
        generateInvoice: (filename:string) => Promise<void>;
    }
  }
}