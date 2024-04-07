import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa"; 

function Proveedores() {
    const [listaProveedores, setListaProveedores] = useState([]);
    const [listaProveedoresFiltrados, setListaProveedoresFiltrados] = useState([]);
    const [textoBuscar, setTextoBuscar] = useState("");
    const [pagina, setPagina] = useState(0);
    const [filasPagina, setFilasPagina] = useState(10);
    const [totalPaginas, setTotalPaginas] = useState(0);
    const [proveedorSeleccionado, setProveedorSeleccionado] = useState(null);

    useEffect(() => {
        leerServicio();
    }, []);

    const leerServicio = () => {
        const rutaServicio = "https://servicios.campus.pe/proveedores.php";
        fetch(rutaServicio)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setListaProveedores(data);
                setListaProveedoresFiltrados(data);
                setTotalPaginas(Math.ceil(data.length / filasPagina));
            });
    };

    const abrirDetalleProveedor = (proveedor) => {
        setProveedorSeleccionado(proveedor);
    };

    const cerrarDetalleProveedor = () => {
        setProveedorSeleccionado(null);
    };

    const dibujarTabla = () => {
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th onClick={() => seleccionarColumna("nombreempresa")}>Empresa</th>
                        <th onClick={() => seleccionarColumna("nombrecontacto")}>Contacto</th>
                        <th onClick={() => seleccionarColumna("cargocontacto")}>Cargo</th>
                        <th onClick={() => seleccionarColumna("ciudad")}>Ciudad</th>
                        <th onClick={() => seleccionarColumna("pais")}>País</th>
                        <th>Detalles</th>
                    </tr>
                </thead>
                <tbody>
                    {listaProveedoresFiltrados.slice(pagina * filasPagina, (pagina + 1) * filasPagina).map(item =>
                        <tr key={item.idproveedor}>
                            <td>{item.idproveedor}</td>
                            <td>{item.nombreempresa}</td>
                            <td>{item.nombrecontacto}</td>
                            <td>{item.cargocontacto}</td>
                            <td>{item.ciudad}</td>
                            <td>{item.pais}</td>
                            <td style={{ textAlign: "center" }}>
                                <FaEye className="eye-icon" onClick={() => abrirDetalleProveedor(item)} />
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    };

    const seleccionarColumna = (columna) => {
        const resultado = [...listaProveedoresFiltrados].sort((a, b) =>
            a[columna] > b[columna] ? 1 : -1
        );
        setListaProveedoresFiltrados(resultado);
    };

    const buscarTexto = (event) => {
        let texto = event.target.value;
        setTextoBuscar(texto);
        const resultado = listaProveedores.filter(item =>
            item["nombreempresa"].toUpperCase().includes(texto.toUpperCase()) ||
            item["nombrecontacto"].toUpperCase().includes(texto.toUpperCase()) ||
            item["cargocontacto"].toUpperCase().includes(texto.toUpperCase()) ||
            item["pais"].toUpperCase().includes(texto.toUpperCase()) ||
            item["ciudad"].toUpperCase().includes(texto.toUpperCase())
        );
        setListaProveedoresFiltrados(resultado);
    };

    const dibujarNumerosPaginacion = () => {
        return (
            <>
                {Array.from({ length: totalPaginas }).map((_, index) =>
                    <li className={index === pagina ? "page-item active" : "page-item"} key={index}>
                        <a className="page-link" href="#"
                            onClick={() => setPagina(index)}>
                            {index + 1}</a>
                    </li>
                )}
            </>
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
        <section id="proveedores" className="padded">
            <div className="container">
                <h2>Proveedores</h2>
                <div className="mb-3">
                    <input type="text" className="form-control" placeholder="Indique expresión a buscar"
                        value={textoBuscar} onChange={(event) => buscarTexto(event)} />
                </div>
                {dibujarTabla()}
                <DetalleProveedor proveedor={proveedorSeleccionado} onClose={cerrarDetalleProveedor} />
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        <li className="page-item"><a className="page-link" href="#"
                            onClick={() => retroceder()}>Anterior</a></li>
                        {dibujarNumerosPaginacion()}
                        <li className="page-item"><a className="page-link" href="#"
                            onClick={() => avanzar()}>Siguiente</a></li>
                    </ul>
                </nav>
            </div>
        </section>
    );
}

function DetalleProveedor({ proveedor, onClose }) {
    return (
        <div className="modal" style={{ display: proveedor ? 'block' : 'none' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Detalles del Proveedor</h4>
                        <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
    {proveedor && (
        <div>
            <ul>
                <li><strong>Nombre de la empresa:</strong> {proveedor.nombreempresa}</li>
                <li><strong>Nombre de contacto:</strong> {proveedor.nombrecontacto}</li>
                <li><strong>Cargo de contacto:</strong> {proveedor.cargocontacto}</li>
                <li><strong>Ciudad:</strong> {proveedor.ciudad}</li>
                <li><strong>País:</strong> {proveedor.pais}</li>
            </ul>
        </div>
    )}
</div>

                </div>
            </div>
        </div>
    );
}

export default Proveedores;