import { useCart } from "../context/CartContext.jsx";

export default function TarjetaProductos({ producto }) {
  const { add } = useCart();

  return (
    <article className="tarjeta-producto">
      <div className="tarjeta-producto-icono">
        💖
      </div>
      <h4>{producto.titulo}</h4>
      <div className="precio">
        ${new Intl.NumberFormat("es-CO").format(producto.precio)}
      </div>
      <button onClick={() => add({ ...producto, qty: 1 })}>
        Agregar al carrito
      </button>
    </article>
  );
}