import express from "express";
import { modificar, resumen } from "./services/presupuestos.service.js";
import { presupuestos } from "./data/datos.js";
import { CambiosPresupuesto } from "./models/presupuesto.js";
const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hola mundo");
});

// Listado, con filtros opcionales material y urgente.
app.get("/api/presupuestos", (req, res) => {

});

// Resumen económico actualizado.
app.get("/api/presupuestos/resumen", (_req, res) => {
    const objetoResumen = resumen();
    return res.status(200).json(objetoResumen)
});

// Presupuesto solicitado o 404.
app.get("/api/presupuestos/:id", (req, res) => {

});

// Nuevo presupuesto, 201 Created y cabecera Location.
app.post("/api/presupuestos", (req, res) => {

});

// Actualización completa, 200 OK o 404.
app.put("/api/presupuestos/:id", (req, res) => {

});

// Actualización parcial, 200 OK o 404.
app.patch("/api/presupuestos/:id", (req, res) => {
    const id = Number(req.params.id);
    const data: Object = req.body;
    const presupuestoModificado = modificar(id, data);
    const statusResponse = presupuestoModificado ? 200 : 404;
    return res.status(statusResponse).json({
        "message": presupuestoModificado ? "Presupuesto actualizado" : "Presupuesto no encontrado",
        "data": presupuestoModificado,
    });
});

// 204 No Content o 404.
app.delete("/api/presupuestos/:id", (req, res) => {

});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});