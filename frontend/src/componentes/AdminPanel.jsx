import { useState } from "react";
import { updateProduct } from "../servicios/api";
import { useTheme } from "../context/ThemeContext.jsx";

export default function AdminPanel({
  productos,
  onAddProducto,
  onProductoEditado,
}) {
  const [titulo, setTitulo] = useState("");
  const [precio, setPrecio] = useState("");
  const [error, setError] = useState("");
  const [editandoId, setEditandoId] = useState(null);
  const [editTitulo, setEditTitulo] = useState("");
  const [editPrecio, setEditPrecio] = useState("");
  const [editError, setEditError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!titulo.trim() || !precio) {
      setError("Completa todos los campos");
      return;
    }
    const p = parseFloat(precio);
    if (isNaN(p) || p <= 0) {
      setError("Precio inválido");
      return;
    }
    await onAddProducto({ titulo: titulo.trim(), precio: p });
    setTitulo("");
    setPrecio("");
  };

  const handleEditClick = (prod) => {
    setEditandoId(prod.id);
    setEditTitulo(prod.titulo);
    setEditPrecio(prod.precio);
    setEditError("");
  };

  const handleEditCancel = () => {
    setEditandoId(null);
    setEditTitulo("");
    setEditPrecio("");
    setEditError("");
  };

  const handleEditSave = async (e) => {
    e.preventDefault();
    setEditError("");
    if (!editTitulo.trim() || !editPrecio) {
      setEditError("Completa todos los campos");
      return;
    }
    const p = parseFloat(editPrecio);
    if (isNaN(p) || p <= 0) {
      setEditError("Precio inválido");
      return;
    }
    try {
      await updateProduct(editandoId, { titulo: editTitulo.trim(), precio: p });
      if (onProductoEditado) await onProductoEditado();
      handleEditCancel();
    } catch (err) {
      setEditError("Error al guardar");
    }
  };

  const { theme } = useTheme();
  const isDark = theme === "dark";
  return (
    <div className="admin-panel">
      <h2 className="admin-panel-titulo">
        Administrar productos
      </h2>
      <form className="admin-panel-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre del producto"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          className="admin-panel-input"
        />
        <input
          type="number"
          placeholder="Precio"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          className="admin-panel-input"
        />
        <button type="submit" className="admin-panel-btn">
          Agregar
        </button>
      </form>
      {error && (
        <div className="admin-panel-error">
          {error}
        </div>
      )}
      <h3 className="admin-panel-subtitulo">
        Productos actuales
      </h3>
      <ul className="admin-panel-lista">
        {productos.map((p) => (
          <li className="admin-panel-item" key={p.id}>
            {editandoId === p.id ? (
              <form className="admin-panel-edit-form" onSubmit={handleEditSave}>
                <input
                  type="text"
                  value={editTitulo}
                  onChange={(e) => setEditTitulo(e.target.value)}
                  className="admin-panel-input"
                />
                <input
                  type="number"
                  value={editPrecio}
                  onChange={(e) => setEditPrecio(e.target.value)}
                  className="admin-panel-input"
                />
                <button type="submit" className="admin-panel-btn">
                  Guardar
                </button>
                <button
                  type="button"
                  className="admin-panel-btn-cancel"
                  onClick={handleEditCancel}
                >
                  Cancelar
                </button>
                {editError && (
                  <div className="admin-panel-error">
                    {editError}
                  </div>
                )}
              </form>
            ) : (
              <>
                <span className="admin-panel-item-titulo">{p.titulo}</span>
                <span className="admin-panel-item-precio">
                  ${p.precio}
                </span>
                <button
                  className="admin-panel-btn-edit"
                  onClick={() => handleEditClick(p)}
                >
                  Editar
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}