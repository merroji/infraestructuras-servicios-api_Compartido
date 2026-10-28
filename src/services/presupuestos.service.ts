import { presupuestos } from "../data/datos.js";
import { CambiosPresupuesto, DatosParaPresupuesto, Presupuesto } from "../models/presupuesto.js";

export function actualizarPresupuesto(): CambiosPresupuesto | undefined {
    
}

export function buscarPresupuesto(id: Number): Presupuesto | undefined {
    return presupuestos.find(a => a.id === id);
}