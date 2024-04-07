import React, { useState } from "react";
import { ApiWebURL } from "../utils";

function PaisInsert() {
    const [paisData, setPaisData] = useState({
        codpais: "",
        pais: "",
        capital: "",
        area: "",
        poblacion: "",
        continente: ""
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPaisData({ ...paisData, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        insertPais();
    };

    const insertPais = () => {
        console.log(paisData.codpais + " - " + paisData.pais + " - " + paisData.capital + " - " + paisData.area + " - " + paisData.poblacion + " - " + paisData.continente);
        const rutaServicio = ApiWebURL + "paisesinsert.php";
    
        let formData = new FormData();
        formData.append("codpais", paisData.codpais);
        formData.append("pais", paisData.pais);
        formData.append("capital", paisData.capital);
        formData.append("area", paisData.area);
        formData.append("poblacion", paisData.poblacion);
        formData.append("continente", paisData.continente);
    
        fetch(rutaServicio, {
            method: "POST",
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            console.log(data);
            window.location.replace("http://localhost:5173/paises");
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    return (
        <div style={{ maxWidth: "800px", margin: "auto" }}>
            <h1 style={{ marginBottom: "20px" }}>Insertar Nuevo País</h1>
            <form onSubmit={handleSubmit} style={{ display: "grid", gap: "10px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 3fr", alignItems: "center" }}>
                    <label htmlFor="pais">Codigo Pais:</label>
                    <input type="text" id="codpais" name="codpais" value={paisData.codpais} onChange={handleChange} required />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 3fr", alignItems: "center" }}>
                    <label htmlFor="pais">Pais:</label>
                    <input type="text" id="pais" name="pais" value={paisData.pais} onChange={handleChange} required />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 3fr", alignItems: "center" }}>
                    <label htmlFor="capital">Capital:</label>
                    <input type="text" id="capital" name="capital" value={paisData.capital} onChange={handleChange} required />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 3fr", alignItems: "center" }}>
                    <label htmlFor="area">Área:</label>
                    <input type="text" id="area" name="area" value={paisData.area} onChange={handleChange} required />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 3fr", alignItems: "center" }}>
                    <label htmlFor="poblacion">Población:</label>
                    <input type="text" id="poblacion" name="poblacion" value={paisData.poblacion} onChange={handleChange} required />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 3fr", alignItems: "center" }}>
                    <label htmlFor="continente">Continente:</label>
                    <input type="text" id="continente" name="continente" value={paisData.continente} onChange={handleChange} required />
                </div>
                <div style={{ textAlign: "center" }}>
                    <input type="submit" value="Insertar" style={{ padding: "10px 20px", fontSize: "16px" }} />
                </div>
            </form>
        </div>

    );
}

export default PaisInsert;