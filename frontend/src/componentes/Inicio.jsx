export default function Inicio({ irCatalogo, irAdmin }) {
  return (
    <div className="inicio-container">
      <div className="inicio-header">
        <div className="inicio-icon">🛍️</div>
        <h1 className="inicio-titulo">
          MiniTienda React + Flask
        </h1>
        <p className="inicio-descripcion">
          Bienvenido, elige una opción para comenzar
        </p>
      </div>
      <div className="inicio-opciones">
        <div
          className="inicio-opcion inicio-opcion-catalogo"
          onClick={irCatalogo}
        >
          <div className="inicio-opcion-icon">🛒</div>
          Ir al Catálogo
        </div>
        <div
          className="inicio-opcion inicio-opcion-admin"
          onClick={irAdmin}
        >
          <div className="inicio-opcion-icon">🛠️</div>
          Ir al Admin
        </div>
      </div>
    </div>
  );
}