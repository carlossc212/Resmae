import React, { useEffect, useState } from "react";

interface Props {
  className?: string;
}

interface StorageItem {
  productId: number;
  name: string;
  totalAmount: number;
  addedAmount: number;
}

const Storage = ({ className }: Props) => {
  const [storageItems, setStorageItems] = useState<StorageItem[]>([]);

  useEffect(() => {
    window.electronAPI.getStorageItems().then(setStorageItems);
  }, []);

  const handleAddAmount = (productId: number) => {
    window.electronAPI.addAmountToStorage(productId, 1).then(() => {
      window.electronAPI.getStorageItems().then(setStorageItems);
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
              <th>Cantidad Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {storageItems.map((item) => (
              <tr key={item.productId}>
                <td>{item.productId}</td>
                <td>{item.name}</td>
                <td>{item.totalAmount}</td>
                <td>
                  <button className="actionIcon edit"></button>
                  <button
                    className="actionIcon add"
                    onClick={() => handleAddAmount(item.productId)}
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