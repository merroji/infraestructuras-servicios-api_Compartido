import { presupuestos } from "../data/datos.js";
import { CambiosPresupuesto, Presupuesto } from "../models/presupuesto.js";

export function modificar(id: number, data: CambiosPresupuesto): Presupuesto|undefined {
    const indice = presupuestos.findIndex(presupuesto => presupuesto.id === id);

    if (indice === -1) return undefined;

    // Aqui se deberian realizar las comprobaciones de los datos

    const presupuestoModificado: Presupuesto = {
        ...presupuestos[indice],
        ...data
    };
    presupuestos[indice] = presupuestoModificado;

    return presupuestoModificado;
}