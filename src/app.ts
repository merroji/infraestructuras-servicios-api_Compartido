import express from "express";
const app = express();

const PORT = 3000;

app.get("/", (req, res) => {
    res.send("Hola mundo");
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});