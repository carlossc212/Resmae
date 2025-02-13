import Datastore from "nedb";

interface Product {
  cod?: number;
  name: string;
  description: string;
  price: number;
  stock?: number;
  _id?: string;
}

const db = new Datastore<Product>({
  filename: "database.db",
  autoload: true,
  timestampData: false,
});

db.loadDatabase();

function autoGetCod() {
  return new Promise<number>((resolve, reject) => {
    db.find({}, (err: any, output: Product[]) => {
      if (err) reject(err);

      if (output.length === 0) {
        resolve(1);
      } else {
        const maxCod = output.reduce((prev, current) => {
          return prev.cod > current.cod ? prev : current;
        }).cod;
        resolve(maxCod + 1);
      }
    });
  });
}

export const getProducts = () => {
  return new Promise<Product[]>((resolve, reject) => {
    db.find({}, (err: any, output: Product[]) => {
      if (err) reject(err);
      resolve(output.sort((a, b) => a.cod - b.cod));
    });
  });
};

export const addProduct = async (product: Product) => {
  const cod = await autoGetCod();
  return await new Promise<void>((resolve, reject) => {
    db.insert({ cod: cod, ...product }, (err: any, _output: Product) => {
      if (err) reject(err);
      resolve();
    });
  });
};

export const addStockToStorage = (id: string, stock: number) => {
  return new Promise<void>((resolve, reject) => {
    db.findOne({ _id: id }, (err, product) => {
      db.update(
        { _id: product._id },
        { $set: { stock: product.stock + stock } },
        {},
        (err, _updatedProduct) => {
          if (err) reject(err);
          resolve();
        }
      );
    });
  });
};

export const deleteProduct = (id: string) => {
  return new Promise<void>((resolve, reject) => {
    db.remove({ _id: id }, {}, (err, _removedProduct) => {
      if (err) reject(err);
      resolve();
    });
  });
};
