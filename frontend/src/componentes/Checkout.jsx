import { useState } from "react";
import { useTheme } from "../context/ThemeContext.jsx";
import { crearPedido } from "../servicios/api.js";

export default function Checkout({
  abierto,
  onClose,
  items,
  total,
  onSuccess,
}) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  if (!abierto) return null;

  async function pagar() {
    setErr("");
    if (!nombre.trim() || !correo.trim()) {
      setErr("Completa nombre y correo");
      return;
    }
    if (!items?.length) {
      setErr("Carrito vacío");
      return;
    }
    setLoading(true);
    try {
      const payloadItems = items.map((it) => ({
        id: it.id ?? null,
        titulo: it.titulo,
        precio: it.precio,
        qty: it.qty,
      }));
      const r = await crearPedido(nombre, correo, payloadItems);
      onSuccess?.(r?.pedido_id);
      onClose?.();
    } catch (e) {
      setErr(e.message || "Error al pagar");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.backdrop} onClick={onClose}>
      <div
        style={{
          ...styles.modal,
          background: isDark ? "#232a36" : "#fff",
          color: isDark ? "#f7fafd" : undefined,
          boxShadow: isDark ? "0 10px 30px #000b" : styles.modal.boxShadow,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3 style={{ color: isDark ? "#fff" : undefined }}>Pagar pedido</h3>
        <div style={{ display: "grid", gap: 8 }}>
          <label>
            Nombre
            <input
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              style={{
                background: isDark ? "#181c24" : undefined,
                color: isDark ? "#f7fafd" : undefined,
                border: isDark ? "1px solid #444" : undefined,
              }}
            />
          </label>
          <label>
            Correo
            <input
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              style={{
                background: isDark ? "#181c24" : undefined,
                color: isDark ? "#f7fafd" : undefined,
                border: isDark ? "1px solid #444" : undefined,
              }}
            />
          </label>
          <div>
            Total: <b>${new Intl.NumberFormat("es-CO").format(total)}</b>
          </div>
          {err && <div style={{ color: "crimson", fontSize: 12 }}>{err}</div>}
          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
            <button
              onClick={onClose}
              disabled={loading}
              style={
                isDark
                  ? {
                      background: "#333c4d",
                      color: "#f7fafd",
                      border: "1px solid #444",
                    }
                  : {}
              }
            >
              Cancelar
            </button>
            <button
              onClick={pagar}
              disabled={loading}
              style={isDark ? { background: "#388e3c", color: "#fff" } : {}}
            >
              {loading ? "Procesando..." : "Pagar"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  backdrop: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,.4)",
    display: "grid",
    placeItems: "center",
    zIndex: 1000,
  },
  modal: {
    background: "#fff",
    padding: 16,
    borderRadius: 12,
    minWidth: 320,
    boxShadow: "0 10px 30px rgba(0,0,0,.2)",
  },
};
