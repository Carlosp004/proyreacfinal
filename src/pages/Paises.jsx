import React, { useEffect, useState } from "react";


function Paises() {
    const [listaPaises, setListaPaises] = useState([]);
    const [listaPaisesFiltrados, setListaPaisesFiltrados] = useState([]);
    const [textoBuscar, setTextoBuscar] = useState("");
    const [pagina, setPagina] = useState(0);
    const [filasPagina, setFilasPagina] = useState(10);
    const [totalPaginas, setTotalPaginas] = useState(0);
    const [paisSeleccionado, setPaisSeleccionado] = useState(null);
    const [ordenAscendente, setOrdenAscendente] = useState(true);

    useEffect(() => {
        leerServicio();
    }, []);

    const leerServicio = () => {
        const rutaServicio = "https://servicios.campus.pe/paises.php";
        fetch(rutaServicio)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al obtener los datos de los países.');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                setListaPaises(data);
                setListaPaisesFiltrados(data);
                setTotalPaginas(Math.ceil(data.length / filasPagina));
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    const mostrarDetallesPais = (nombrePais) => {
        const pais = listaPaises.find(pais => pais.pais === nombrePais);
        setPaisSeleccionado(pais);
    };

    const cerrarDetallesPais = () => {
        setPaisSeleccionado(null);
    };

    const dibujarTabla = () => {
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th onClick={ordenarPorColumna("pais")}>Codigo País</th>
                        <th onClick={ordenarPorColumna("pais")}>País</th>
                        <th onClick={ordenarPorColumna("capital")}>Capital</th>
                        <th onClick={ordenarPorColumna("area")}>Área</th>
                        <th onClick={ordenarPorColumna("poblacion")}>Población</th>
                        <th onClick={ordenarPorColumna("continente")}>Continente</th>
                    </tr>
                </thead>
                <tbody>
                    {listaPaisesFiltrados.slice(pagina * filasPagina, (pagina + 1) * filasPagina).map(pais =>
                        <tr key={pais.idpais}>
                            <td>{pais.idpais}</td>
                            <td>{pais.codpais}</td>
                            <td>{pais.pais}</td>
                            <td>{pais.capital}</td>
                            <td>{pais.area}</td>
                            <td>{pais.poblacion}</td>
                            <td>{pais.continente}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    };

    const ordenarPorColumna = (columna) => () => {
        const nuevaLista = [...listaPaisesFiltrados].sort((a, b) => {
            if (a[columna] < b[columna]) {
                return ordenAscendente ? -1 : 1;
            }
            if (a[columna] > b[columna]) {
                return ordenAscendente ? 1 : -1;
            }
            return 0;
        });
        setListaPaisesFiltrados(nuevaLista);
        setOrdenAscendente(!ordenAscendete);

    }
    const buscarTexto = (valor) => {
        const texto = valor.trim().toUpperCase();
        const resultado = listaPaises.filter(pais =>
            pais["pais"].toUpperCase().includes(texto) ||
            pais["capital"].toUpperCase().includes(texto) ||
            pais["continente"].toUpperCase().includes(texto)
        );
        setListaPaisesFiltrados(resultado);
    };

    const handleChangeTextoBuscar = (event) => {
        setTextoBuscar(event.target.value);
        buscarTexto(event.target.value);
    };

    const dibujarNumerosPaginacion = () => {
        let inicio = 0;
        let fin = totalPaginas;
        const numPaginasMostradas = 5;

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

    const handleAgregarPais = () => {
        // Redireccionar a la página de inserción de país
        window.location.href = "/paisinsert";
    };


    return (
        <section id="Paises" className="padded">
            <div className="container">
                <h2>PAÍSES</h2>
                <div className="row">
                    <div className="col-sm-6"> {/* Este div ocupa la mitad del espacio */}
                        <div className="mb-3">
                            <input type="text" className="form-control" placeholder="Indique expresión a buscar"
                                value={textoBuscar} onChange={handleChangeTextoBuscar} />
                        </div>
                    </div>
                    <div className="col-sm-5 d-flex justify-content-end align-items-start"> {/* Este div ocupa la otra mitad del espacio y alinea los elementos a la derecha */}
                        <button className="btn btn-primary" onClick={handleAgregarPais}>Agregar País</button>
                    </div>
                </div>
                {dibujarTabla()}
                {paisSeleccionado && (
                    <div className="grid-card">
                        <h3>Detalles del País</h3>
                        <button className="btn btn-close" onClick={cerrarDetallesPais}>Cerrar</button>
                        <p>Código: {paisSeleccionado.codigo}</p>
                        <p>Nombre: {paisSeleccionado.nombre}</p>
                        <p>Capital: {paisSeleccionado.capital}</p>
                        <p>Continente: {paisSeleccionado.continente}</p>
                        {/* Agrega más detalles según la estructura de los datos */}
                    </div>
                )}
                {dibujarPaginacion()}
            </div>

        </section>
    );
}

export default Paises;

