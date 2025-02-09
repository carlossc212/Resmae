import { Database } from 'sqlite3';

export const db = new Database('database.db');
let renderedWindow: Electron.BrowserWindow | null = null;

export function initializeDatabase(mainWindow: Electron.BrowserWindow) {
  renderedWindow = mainWindow;
  db.run(`CREATE TABLE IF NOT EXISTS products (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          description TEXT,
          price REAL NOT NULL
      );`);
  console.log('Base de datos inicializada y tabla de productos creada si no existia');
}

export function addProduct(name: string, description: string, price: number): Promise<void> {
  return new Promise((resolve, reject) => {
    db.run(`INSERT INTO products (name, description, price) VALUES (?, ?, ?)`, [name, description, price], (err) => {
        if (err) {
          console.error("Error al agregar el producto:", err);
          reject(err);
        } else {
          resolve();
        }
      }
    );
  });
}

export function getProducts(): Promise<{ id: number; name: string; description: string; price: number }[]> {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM products', (err, rows) => {
      if (err) {
        console.error('Error al obtener productos:', err);
        reject(err);
      } else {
        resolve(rows as { id: number; name: string; description: string; price: number }[]);
      }
    });
  });
}
  
// database.ts
export function deleteProduct(id: number): Promise<void> {
  return new Promise((resolve, reject) => {
    db.run(`DELETE FROM products WHERE id = ?`, [id], (err) => {
      if (err) {
        console.error("Error al eliminar el producto:", err);
        reject(err);
      } else {
        resolve();
      }
    });
  });
}