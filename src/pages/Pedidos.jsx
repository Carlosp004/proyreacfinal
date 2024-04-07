import { useEffect, useState } from "react";
import { ApiWebURL } from "../utils";
import { Link } from "react-router-dom"; // Importar el componente Link

function Pedidos() {
    const [listaPedidos, setListaPedidos] = useState([]);
    const [listaPedidosFiltrados, setListaPedidosFiltrados] = useState([]);
    const [textoBuscar, setTextoBuscar] = useState("");
    const [pagina, setPagina] = useState(0);
    const [filasPagina, setFilasPagina] = useState(10);
    const [totalPaginas, setTotalPaginas] = useState(0);
    const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);
    

    useEffect(() => {
        leerServicio();
    }, []);

    const leerServicio = () => {
        const rutaServicio = ApiWebURL + "pedidos.php";
        fetch(rutaServicio)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al obtener los datos de los pedidos.');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                setListaPedidos(data);
                setListaPedidosFiltrados(data);
                setTotalPaginas(Math.ceil(data.length / filasPagina));
            })
            .catch(error => {
                console.error('Error:', error);
            });

    };

    const mostrarDetallesPedido = (idPedido) => {
        const rutaDetallesPedido = `https://servicios.campus.pe/pedidosdetalle.php?idpedido=${idPedido}`;
        //const rutaDetallesPedido = `https://servicios.campus.pe/pedidosdetalle.php?codpais=${idPedido}?`;
        fetch(rutaDetallesPedido)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setPedidoSeleccionado(data);
            });
    };

    const cerrarDetallesPedido = () => {
        setPedidoSeleccionado(null);
    };

    const dibujarTabla = () => {
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th onClick={() => seleccionarColumna("nombres")}>Nombres</th>
                        <th onClick={() => seleccionarColumna("usuario")}>Usuario</th>
                        <th onClick={() => seleccionarColumna("total")}>Total</th>
                        <th onClick={() => seleccionarColumna("fechapedido")}>Fecha de Pedido</th>
                    </tr>
                </thead>
                <tbody>
                    {listaPedidosFiltrados.slice(pagina * filasPagina, (pagina + 1) * filasPagina).map(item =>
                        <tr key={item.idpedido}>
                            {/* Utilizar Link para redirigir a PedidoDetalle con el ID del pedido */}
                            <td><Link to={`/pedidos/detallespedido/${item.idpedido}`}>{item.idpedido}</Link></td>
                            <td>{item.nombres}</td>
                            <td>{item.usuario}</td>
                            <td>{item.total}</td>
                            <td>{item.fechapedido}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    };

    const seleccionarColumna = (columna) => {
        console.log(columna);
        const resultado = [...listaPedidosFiltrados].sort((a, b) =>
            a[columna] > b[columna] ? 1 : -1
        );
        console.log(resultado);
        setListaPedidosFiltrados(resultado);
    };

    const buscarTexto = (valor) => {
        const texto = valor.trim().toUpperCase(); // Eliminar espacios en blanco al inicio y final y convertir a mayúsculas
        const resultado = listaPedidos.filter(item =>
            item["nombres"].toUpperCase().includes(texto) ||
            item["usuario"].toUpperCase().includes(texto) ||
            item["total"].toString().includes(texto) || // Convertir a cadena para búsqueda
            item["fechapedido"].toUpperCase().includes(texto)
        );
        setListaPedidosFiltrados(resultado);
    };
    
    const handleChangeTextoBuscar = (event) => {
        setTextoBuscar(event.target.value); // Actualizar el estado del texto de búsqueda
        buscarTexto(event.target.value); // Llamar a la función de búsqueda con el valor actualizado
    };

    const dibujarNumerosPaginacion = () => {
        let inicio = 0;
        let fin = totalPaginas;
        const numPaginasMostradas = 5; // Mostrar hasta la página 5
    
        if (totalPaginas > numPaginasMostradas) {
            if (pagina <= 2) {
                fin = numPaginasMostradas;
            } else if (pagina >= totalPaginas - 3) {
                inicio = totalPaginas - numPaginasMostradas;
            } else {
                inicio = pagina - 2;
                fin = pagina + 2;
            }
        }
    
        return (
            <>
                {Array.from({ length: fin - inicio }).map((_, index) =>
                    <li className={inicio + index === pagina ? "page-item active" : "page-item"} key={inicio + index}>
                        <a className="page-link" href="#"
                            onClick={() => setPagina(inicio + index)}>
                            {inicio + index + 1}</a>
                    </li>
                )}
            </>
        );
    };
    

    const dibujarPaginacion = () => {
        return (
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    <li className="page-item"><a className="page-link" href="#"
                        onClick={() => retroceder()}>Anterior</a></li>
                    {dibujarNumerosPaginacion()}
                    <li className="page-item"><a className="page-link" href="#"
                        onClick={() => avanzar()}>Siguiente</a></li>
                </ul>
            </nav>
        );
    };

    const retroceder = () => {
        if (pagina > 0) {
            setPagina(pagina - 1);
        }
    };
    const avanzar = () => {
        if (pagina < totalPaginas - 1) {
            setPagina(pagina + 1);
        }
    };

    return (
        <section id="Pedidos" className="padded">
            <div className="container">
                <h2>PEDIDOS</h2>
                <div className="mb-3">
                    <input type="text" className="form-control" placeholder="Indique expresión a buscar"
                        value={textoBuscar} onChange={handleChangeTextoBuscar} />
                </div>
                {dibujarTabla()}
                {pedidoSeleccionado && (
                    <div className="grid-card">
                        <h3>Detalles del Pedido</h3>
                        <button className="btn btn-close" onClick={cerrarDetallesPedido}>Cerrar</button>
                        <p>Detalle 1: {pedidoSeleccionado.detalle1}</p>
                        <p>Detalle 2: {pedidoSeleccionado.detalle2}</p>
                        {/* Agrega más detalles según la estructura de los datos */}
                    </div>
                )}
                {dibujarPaginacion()}
            </div>
        </section>
    );
}

export default Pedidos;
