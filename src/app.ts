import express from "express";
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
app.get("/api/presupuestos/resumen", (req, res) => {

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

});

// 204 No Content o 404.
app.delete("/api/presupuestos/:id", (req, res) => {

});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});