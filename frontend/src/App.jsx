import { useEffect, useState } from "react";
import { useTheme } from "./context/ThemeContext.jsx";
import Encabezado from "./componentes/Encabezado.jsx";
import CuadriculaProductos from "./componentes/CuadriculaProductos.jsx";
import CarritoPanel from "./componentes/CarritoPanel.jsx";
import LiveDashboard from "./componentes/LiveDashboard.jsx";
import AdminPanel from "./componentes/AdminPanel.jsx";
import Inicio from "./componentes/Inicio.jsx";
import { listProducts, seed, createProduct } from "./servicios/api.js";

export default function App() {
  const { theme } = useTheme();
  const [vista, setVista] = useState("inicio"); // "inicio" | "catalogo" | "datos" | "admin"
  const [carritoOpen, setCarritoOpen] = useState(false);
  const [productos, setProductos] = useState([]);

  async function cargar() {
    try {
      const ps = await listProducts();
      if (!ps.length) {
        await seed();
      }
      setProductos(await listProducts());
    } catch {}
  }
  useEffect(() => {
    cargar();
  }, []);

  // Función para agregar producto desde AdminPanel
  async function handleAddProducto(nuevo) {
    await createProduct(nuevo);
    await cargar(); // recarga productos
  }

  useEffect(() => {
    document.body.className = theme === "dark" ? "theme-dark" : "theme-light";
  }, [theme]);

  return (
    <div
      style={{
        maxWidth: 1100,
        margin: "24px auto",
        padding: 16,
        fontFamily: "system-ui,sans-serif",
        transition: "background 0.2s, color 0.2s",
      }}
    >
      {vista !== "inicio" && (
        <Encabezado
          vista={vista}
          onGoCatalogo={
            vista === "catalogo" || vista === "admin"
              ? undefined
              : () => setVista("catalogo")
          }
          onGoDatos={() => setVista("datos")}
          onGoAdmin={
            vista === "admin" || vista === "catalogo"
              ? undefined
              : () => setVista("admin")
          }
          onToggleCarrito={() => setCarritoOpen((v) => !v)}
        />
      )}

      {vista === "inicio" && (
        <Inicio
          irCatalogo={() => setVista("catalogo")}
          irAdmin={() => setVista("admin")}
        />
      )}

      {vista === "catalogo" && (
        <>
          <button
            onClick={() => setVista("inicio")}
            style={{
              margin: "16px 0 24px 0",
              padding: "10px 28px",
              borderRadius: 10,
              border: "none",
              background: "linear-gradient(90deg, #1976d2 60%, #42a5f5 100%)",
              color: "#fff",
              fontWeight: 700,
              fontSize: 18,
              cursor: "pointer",
              boxShadow: "0 2px 12px #1976d233",
              letterSpacing: 1,
              transition: "background 0.2s, transform 0.15s",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.background =
                "linear-gradient(90deg, #1565c0 60%, #64b5f6 100%)")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.background =
                "linear-gradient(90deg, #1976d2 60%, #42a5f5 100%)")
            }
          >
            ← Volver al inicio
          </button>
          <CuadriculaProductos productos={productos} />
        </>
      )}

      {vista === "datos" && (
        <LiveDashboard days={30} initialMetric="cantidad" limit={6} top={5} />
      )}

      {vista === "admin" && (
        <>
          <button
            onClick={() => setVista("inicio")}
            style={{
              margin: "16px 0 24px 0",
              padding: "8px 20px",
              borderRadius: 8,
              border: "none",
              background: "#ffa726",
              color: "#333",
              fontWeight: 600,
              fontSize: 16,
              cursor: "pointer",
            }}
          >
            Volver al inicio
          </button>
          <AdminPanel
            productos={productos}
            onAddProducto={handleAddProducto}
            onProductoEditado={cargar}
          />
        </>
      )}

      <CarritoPanel
        abierto={carritoOpen}
        onClose={() => setCarritoOpen(false)}
      />
    </div>
  );
}
