import React, { useEffect, useState } from "react";

interface Props {
  className?: string;
}

interface Product {
  _id: string;
  cod: number;
  name: string;
  description: string;
  price?: number;
  stock?: number;
}

const Storage = ({ className }: Props) => {
  const [storageItems, setStorageItems] = useState<Product[]>([]);

  useEffect(() => {
    window.electronAPI.getProducts().then(setStorageItems);
  }, []);

  const handleAddStock = (productId: string) => {
    window.electronAPI.addStockToStorage(productId, 1).then(() => {
      window.electronAPI.getProducts().then(setStorageItems);
    });
  };

  return (
    <>
      <div id="storage" className={`view ${className}`}>
        <h2 className="title">
          <span>Almacén</span>
        </h2>
        <table className="storage-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Cantidad total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {storageItems.map((item) => (
              <tr key={item._id}>
                <td>{item.cod}</td>
                <td>{item.name}</td>
                <td>{item.stock}</td>
                <td>
                  <button className="actionIcon edit"></button>
                  <button
                    className="actionIcon add"
                    onClick={() => handleAddStock(item._id)}
                  >
                    +
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Storage;