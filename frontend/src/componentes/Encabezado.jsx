import { useTheme } from "../context/ThemeContext.jsx";
import { useCart } from "../context/CartContext.jsx";

export default function Encabezado({
  vista,
  onGoCatalogo,
  onGoAdmin,
  onGoDatos,
  onToggleCarrito,
}) {
  const { theme, toggleTheme } = useTheme();
  const { count } = useCart();
  const is = (v) => vista === v;
  const btn = (a) => ({ opacity: a ? 0.6 : 1, fontWeight: a ? 700 : 500 });

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 12,
        marginBottom: 16,
      }}
    >
      <h1 style={{ margin: 0 }}>Mi Tienda</h1>
      <nav style={{ display: "flex", gap: 8, alignItems: "center" }}>
        {/* Solo mostrar "Ver tienda" y "Carrito" si NO estamos en admin */}
        {vista !== "admin" && (
          <>
            <button
              style={btn(is("catalogo"))}
              onClick={onGoCatalogo}
              disabled={is("catalogo")}
            >
              Ver tienda
            </button>
            <button onClick={onToggleCarrito}>🛒 Carrito ({count})</button>
          </>
        )}
        {/* Solo mostrar "Admin" y "Datos" si NO estamos en catálogo */}
        {vista !== "catalogo" && (
          <>
            <button
              style={btn(is("datos"))}
              onClick={onGoDatos}
              disabled={is("datos")}
            >
              Datos
            </button>
            <button onClick={onGoAdmin}>Admin</button>
          </>
        )}
        <button onClick={toggleTheme}>
          🌓 Tema: {theme === "dark" ? "Oscuro" : "Claro"}
        </button>
      </nav>
    </header>
  );
}
