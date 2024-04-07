import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Empleados() {
    const [listaEmpleados, setListaEmpleados] = useState([]);
    const [empleadosSeleccionados, setEmpleadosSeleccionados] = useState([]);
    const [cargando, setCargando] = useState(true);
    console.log("Lista de empleados", listaEmpleados)
    useEffect(() => {
        leerServicio();
    }, []);

    const leerServicio = () => {
        const rutaServicio = "https://servicios.campus.pe/empleados.php";
        fetch(rutaServicio)
            .then(response => response.json())
            .then(data => {
                setCargando(false);
                setListaEmpleados(data);
            });
    };

    const toggleSeleccion = (empleado) => {
        console.log(empleado)
        //item.cantidad = Number(cantProducto)  //1
        let carrito = []
        if (sessionStorage.getItem("seleccionempleado")) {
            //console.log(carrito)
            carrito = JSON.parse(sessionStorage.getItem("seleccionempleado"))

            carrito.push(empleado)


        }
        else {
            carrito.push(empleado)
        }

        sessionStorage.setItem("seleccionempleado", JSON.stringify(carrito))
        console.log(carrito)

    };

    return (
        <section id="empleados" className="padded">
            <div className="container">
                <h2>Empleados</h2>
                {cargando === true ? (
                    <div className="lds-grid">
                        <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
                    </div>
                ) : (
                    <div className="row row-cols-xxl-5 row-cols-xl-4 row-cols-lg-3 row-cols-2 g-4">
                        {listaEmpleados.map(empleado => (
                            <div className="col" key={empleado.idempleado}>
                                <div className="card">
                                    <img src={"https://servicios.campus.pe/fotos/" + empleado.foto} className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title">{empleado.nombres} {empleado.apellidos}</h5>
                                        <p className="card-text">{empleado.cargo}</p>
                                        <button className="btn btn-primary" onClick={() => toggleSeleccion(empleado)}>
                                            {empleadosSeleccionados.some(e => e.idempleado === empleado.idempleado) ? 'Quitar de seleccionados' : 'Seleccionar'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                <Link to={{ pathname: "/seleccionados", state: { empleadosSeleccionados: empleadosSeleccionados } }}>
                    Ver Seleccionados
                </Link>
            </div>
        </section>
    );
}

export default Empleados;