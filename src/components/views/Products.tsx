import React, { useRef, useState } from "react";

interface Props {
  className?: string;
}

const Products = ({ className }: Props) => {
  const [products, setProducts] = useState<
    Array<{
      _id: string;
      cod: number;
      name: string;
      description: string;
      price?: number;
      stock?: number;
    }>
  >([]);

  const [newProduct, setNewProduct] = useState<{
    name: string;
    description: string;
    price?: number;
  }>({
    name: "",
    description: "",
  });

  const [currentProduct, setCurrentProduct] = useState<{
    _id: string;
    cod: number;
    name: string;
    description: string;
    price?: number;
    stock?: number;
  }>(null);

  const addProductDialogRef = useRef<HTMLDialogElement>(null);
  const deleteProductDialogRef = useRef<HTMLDialogElement>(null);

  try {
    window.electronAPI.getProducts().then(setProducts);
  } catch (error) {
    console.error("Error al obtener los productos:", error);
  }
  return (
    <>
      <div className={`view ${className}`}>
        <h2 className="title spacing">
          <span>Productos</span>
          <div>
            <button
              className="add-product-button"
              onClick={() => addProductDialogRef.current?.showModal()}
            >
              Añadir
            </button>
          </div>
        </h2>
        <table className="products-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product.cod}</td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>€{product.price.toFixed(2)}</td>
                <td>
                  <button className="actionIcon edit">
                  </button>
                  <button
                    className="actionIcon delete"
                    onClick={() => {
                      setCurrentProduct(product);
                      deleteProductDialogRef.current?.showModal();
                      const submitDeleteButton = deleteProductDialogRef.current?.querySelector(
                        "button[type='submit']"
                      ) as HTMLButtonElement;
                      if (submitDeleteButton) submitDeleteButton.focus();
                    }}>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <dialog id="addProductDialog" ref={addProductDialogRef}>
          <form
            method="dialog"
            id="addProductForm"
            onSubmit={() => {
              window.electronAPI
                .addProduct(
                  newProduct.name,
                  newProduct.description,
                  newProduct.price
                )
                .then(window.electronAPI.getProducts)
                .then(setProducts);
              setNewProduct({ name: "", description: "", price: null });
            }}
          >
            <h3>Agregar nuevo producto</h3>
            <label htmlFor="productName">Nombre:</label>
            <input
              type="text"
              name="productName"
              value={newProduct.name}
              onChange={(event) =>
                setNewProduct({ ...newProduct, name: event.target.value })
              }
              required
            />

            <label htmlFor="productDescription">Descripción:</label>
            <input
              type="text"
              name="productDescription"
              value={newProduct.description}
              onChange={(event) =>
                setNewProduct({
                  ...newProduct,
                  description: event.target.value,
                })
              }
              required
            />

            <label htmlFor="productPrice">Precio:</label>
            <input
              type="number"
              name="productPrice"
              value={newProduct.price ?newProduct.price : ""}
              onChange={(event) =>
                setNewProduct({
                  ...newProduct,
                  price: parseFloat(event.target.value),
                })
              }
              required
              step="0.01"
            />

            <menu>
              <button
                type="reset"
                onClick={() => {
                    addProductDialogRef.current?.close();
                    setNewProduct({ name: "", description: "", price: null });
                }}
              >
                Cancelar
              </button>
              <button type="submit">Aceptar</button>
            </menu>
          </form>
        </dialog>

        <dialog id="deleteProductDialog" ref={deleteProductDialogRef}>
          <form method="dialog" id="deleteProductForm" onSubmit={()=>{
            window.electronAPI.deleteProduct(currentProduct._id);
            window.electronAPI.getProducts().then(setProducts);
            deleteProductDialogRef.current?.close();
          }}>
            <h3>Confirmar eliminación</h3>
            <p>¿Estás seguro? Será irreversible</p>
            <menu>
              <button type="reset" onClick={()=>deleteProductDialogRef.current?.close()}>Cancelar</button>
              <button type="submit">
                Aceptar
              </button>
            </menu>
          </form>
        </dialog>

      </div>
    </>
  );
};

export default Products;