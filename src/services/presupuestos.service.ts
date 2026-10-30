import { presupuestos } from "../data/datos.js";
import { CambiosPresupuesto, Presupuesto } from "../models/presupuesto.js";

export function modificar(id: number, data: CambiosPresupuesto): Presupuesto|undefined {
    let presupuesto: Presupuesto|undefined = presupuestos.find(presupuesto => presupuesto.id == id);

    if (!presupuesto) return undefined;

    // Aqui se deberian realizar las comprobaciones de los datos

    presupuesto = {
        ...presupuesto,
        ...data
    }

    return presupuesto;
}