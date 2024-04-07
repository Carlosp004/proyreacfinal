import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ApiWebURL } from '../utils';

function PedidoDetalle() {
    const { idPedido } = useParams();
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        obtenerProductosPedido();
    }, [idPedido]);

    const obtenerProductosPedido = () => {
        const rutaServicio = `${ApiWebURL}pedidosdetalle.php?idpedido=${idPedido}`;
        fetch(rutaServicio)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setProductos(data); // Asignar los productos al estado
            })
            .catch(error => {
                console.error('Error al obtener los productos del pedido:', error);
            });
    };

    return (
        <div className="pedido-detalle">
            <h2>Productos del Pedido #{idPedido}</h2>
            <ul>
                {productos.map(producto => (
                    <li key={producto.idproducto}>
                        <h3>{producto.nombre}</h3>
                        <p>Precio: {producto.precio}</p>
                        <p>Cantidad: {producto.cantidad}</p>
                        <p>Detalle: {producto.detalle}</p>
                        <img src={ApiWebURL + producto.imagenchica} alt={producto.nombre} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PedidoDetalle;