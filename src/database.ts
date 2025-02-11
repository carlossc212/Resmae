import { Database } from 'sqlite3';

interface StorageItem {
  productId: number;
  name: string;
  totalAmount: number;
  addedAmount: number;
}

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

  db.run(`CREATE TABLE IF NOT EXISTS storage (
          productId INTEGER PRIMARY KEY,
          name TEXT NOT NULL,
          totalAmount INTEGER DEFAULT 0,
          addedAmount INTEGER DEFAULT 0,
          FOREIGN KEY (productId) REFERENCES products(id)
      );`);

  console.log('Base de datos inicializada y tablas de productos y almacén creadas si no existían');
}

export function addProduct(name: string, description: string, price: number): Promise<void> {
  return new Promise((resolve, reject) => {
    db.run(`INSERT INTO products (name, description, price) VALUES (?, ?, ?)`, [name, description, price], function(err) {
      if (err) {
        console.error("Error al agregar el producto:", err);
        reject(err);
      } else {
        const productId = this.lastID;
        db.run(`INSERT INTO storage (productId, name) VALUES (?, ?)`, [productId, name], (err) => {
          if (err) {
            console.error("Error al agregar el producto al almacén:", err);
            reject(err);
          } else {
            resolve();
          }
        });
      }
    });
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
  
export function deleteProduct(id: number): Promise<void> {
  return new Promise((resolve, reject) => {
    // Iniciar una transacción para asegurar la atomicidad
    db.serialize(() => {
      db.run("BEGIN TRANSACTION");

      // Eliminar el producto de la tabla `products`
      db.run(`DELETE FROM products WHERE id = ?`, [id], function (err) {
        if (err) {
          console.error("Error al eliminar el producto:", err);
          db.run("ROLLBACK"); // Revertir la transacción en caso de error
          reject(err);
        } else {
          // Eliminar el registro correspondiente en la tabla `storage`
          db.run(`DELETE FROM storage WHERE productId = ?`, [id], function (err) {
            if (err) {
              console.error("Error al eliminar el producto del almacén:", err);
              db.run("ROLLBACK"); // Revertir la transacción en caso de error
              reject(err);
            } else {
              db.run("COMMIT"); // Confirmar la transacción
              resolve();
            }
          });
        }
      });
    });
  });
}

export function getStorageItems(): Promise<StorageItem[]> {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM storage', (err, rows) => {
      if (err) {
        console.error('Error al obtener los items del almacén:', err);
        reject(err);
      } else {
        resolve(rows as StorageItem[]);
      }
    });
  });
}

export function addAmountToStorage(productId: number, amount: number): Promise<void> {
  return new Promise((resolve, reject) => {
    db.run(`UPDATE storage SET totalAmount = totalAmount + ?, addedAmount = ? WHERE productId = ?`, [amount, amount, productId], (err) => {
      if (err) {
        console.error("Error al añadir cantidad al almacén:", err);
        reject(err);
      } else {
        resolve();
      }
    });
  });
}