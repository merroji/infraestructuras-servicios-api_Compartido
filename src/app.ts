import express from "express";
import { crearPresupuesto, listarPresupuesto, eliminarPresupuesto, actualizarPresupuesto, buscarPresupuesto, esMaterialValido } from "./services/presupuestos.service.js";
import { DatosParaPresupuesto } from "./models/presupuesto.js";
import { presupuestos } from "./data/datos.js";
const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hola mundo");
});

// Listado, con filtros opcionales material y urgente.
app.get("/api/presupuestos", (req, res) => {
    const material = req.query.material as string | undefined;
    const urgente = req.query.urgente as string | undefined;

    const lista = listarPresupuesto(material, urgente);

    res.status(200).json(lista);
});

// Resumen económico actualizado.
app.get("/api/presupuestos/resumen", (req, res) => {

});

// Presupuesto solicitado o 404.
app.get("/api/presupuestos/:id", (req, res) => {
    const id = Number(req.params.id);
    const presupuesto = buscarPresupuesto(id);

    if (!presupuesto) {
        res.status(404).json({ mensaje: "Presupuesto no encontrado" });
        return;
    }
    res.status(200).json(presupuesto);
});

// Nuevo presupuesto, 201 Created y cabecera Location.
app.post("/api/presupuestos", (req, res) => {
    const canal = req.get("X-Canal")?? "desconocido"
    const nuevoPresupuesto = crearPresupuesto(canal, req.body)

    res.status(201)
        .location(`/api/presupuestos/${nuevoPresupuesto.id}`)
        .json(nuevoPresupuesto);

});

// Actualización completa, 200 OK o 404.
app.put("/api/presupuestos/:id", (req, res) => {
    const id = Number(req.params.id);
    const datos = (req.body ?? {}) as DatosParaPresupuesto;

    if (
        typeof datos.cliente !== "string" ||
        datos.cliente.trim() === "" ||
        typeof datos.material !== "string" ||
        !esMaterialValido(datos.material) ||
        typeof datos.gramos !== "number" ||
        !Number.isFinite(datos.gramos) ||
        datos.gramos <= 0 ||
        typeof datos.urgente !== "boolean"
    ) {
        res.status(400).json({ mensaje: "Datos de presupuesto no válidos" });
        return;
    }

    const presupuesto = actualizarPresupuesto(id, {
        cliente: datos.cliente,
        material: datos.material,
        gramos: datos.gramos,
        urgente: datos.urgente
    });
    if (!presupuesto) {
        res.status(404).json({ mensaje: "Presupuesto no encontrado" });
        return;
    }
    res.status(200).json(presupuesto);
});

// Actualización parcial, 200 OK o 404.
app.patch("/api/presupuestos/:id", (req, res) => {

});

// 204 No Content o 404.
app.delete("/api/presupuestos/:id", (req, res) => {
    const id = Number(req.params.id);

    const eliminado = eliminarPresupuesto(id)

    if (eliminado === undefined) {
        return res.status(404).json({ mensaje: "Presupuesto no ha sido encontrado" });
    }
    res.status(204).send()
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});