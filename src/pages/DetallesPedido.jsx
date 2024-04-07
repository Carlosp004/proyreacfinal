import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ApiWebURL } from "../utils";

function DetallesPedido() {
  const [productos, setProductos] = useState([]);
  const params = useParams();

  useEffect(() => {
    leerProductos();
  }, []);

  const leerProductos = () => {
    const rutaServicio = ApiWebURL + `pedidosdetalle.php?idpedido=${params.idpedido}`;
    fetch(rutaServicio)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProductos(data);
      })
      .catch((error) => console.error("Error:", error));
  };

  
}

export default DetallesPedido;
