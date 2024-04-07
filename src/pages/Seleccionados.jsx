import { useEffect, useState } from "react";

function Seleccionados({ empleadosSeleccionados }) {
    const [total, setTotal] = useState(0);

    useEffect(() => {
        if (empleadosSeleccionados) {
            calcularTotal(empleadosSeleccionados);
        }
    }, [empleadosSeleccionados]);

    const dibujarTabla = () => {
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellidos</th>
                        <th>Cargo</th>
                        <th>Imagen</th>
                        <th className="text-end"></th>
                    </tr>
                </thead>
                <tbody>
                    {empleadosSeleccionados && empleadosSeleccionados.map(item => (
                        <tr key={item.idempleado}>
                            <td>{item.nombres}</td>
                            <td>{item.apellidos}</td>
                            <td>{item.cargo}</td>
                            <td><img src={`https://servicios.campus.pe/fotos/${item.foto}`} alt="Foto" /></td>
                            <td><i className="bi bi-x-lg" title="Eliminar" onClick={() => eliminarItem(item)}></i></td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="2" className="text-end">Total</td>
                        <td className="text-end">{total.toFixed(2)}</td>
                    </tr>
                </tfoot>
            </table>
        );
    };

    const calcularTotal = (empleados) => {
        const sumaTotal = empleados.reduce((total, empleado) => total + empleado.precio, 0);
        setTotal(sumaTotal);
    };

    const eliminarItem = (item) => {
        const nuevosSeleccionados = empleadosSeleccionados.filter(empleado => empleado.idempleado !== item.idempleado);
        calcularTotal(nuevosSeleccionados);
        // Actualizar el estado de los empleados seleccionados
    };

    const vaciarSeleccionados = () => {
        setTotal(0);
        // Limpiar los empleados seleccionados del estado y del sessionStorage
    };

    return (
        <section id="seleccionados" className="padded">
            <div className="container">
                <h2>Seleccionados</h2>
                {dibujarTabla()}
                <button className="btn btn-danger" onClick={vaciarSeleccionados}>Vaciar seleccionados</button>
            </div>
        </section>
    );
}

export default Seleccionados;