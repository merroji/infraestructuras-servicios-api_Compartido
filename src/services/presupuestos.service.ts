import { presupuestos } from "../data/datos.js";
import { CambiosPresupuesto, Presupuesto } from "../models/presupuesto.js";

export function modificar(id: number, data: CambiosPresupuesto): Presupuesto|undefined {
    const presupuestoOriginal: Presupuesto|undefined = presupuestos.find(presupuesto => presupuesto.id == id);

    if (!presupuestoOriginal) return undefined;

    const presupuestoModificado: Presupuesto = 

    return presupuestoOriginal;
}