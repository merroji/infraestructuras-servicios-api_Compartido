import { presupuestos } from "../data/datos.js";
import { CambiosPresupuesto, Presupuesto } from "../models/presupuesto.js";

export function resumen(): Object {
    const totalPresupuestos: Number = presupuestos.length;
    const importeAcumulado: Number = presupuestos.reduce((total, presupuesto) => presupuesto.importe + total, 0);
    const presupuestosUrgentes: Number = presupuestos.reduce((total, presupuesto) => presupuesto.urgente ? total+1 : total, 0);
    return {
        "totalPresupuestos": totalPresupuestos,
        "importeAcumulado": importeAcumulado,
        "presupuestosUrgentes": presupuestosUrgentes
    }
}

export function modificar(id: number, data: CambiosPresupuesto): Presupuesto|undefined {
    const indice = presupuestos.findIndex(presupuesto => presupuesto.id === id);
    const {cliente, material, gramos, urgente} = data

    if (indice === -1) return undefined;

    // Aqui se deberian realizar las comprobaciones de los datos

    const presupuestoModificado: Presupuesto = {
        ...presupuestos[indice],
        cliente: cliente ?? presupuestos[indice].cliente,
        material: material ?? presupuestos[indice].material,
        gramos: gramos ?? presupuestos[indice].gramos,
        urgente: urgente ?? presupuestos[indice].urgente
    };
    presupuestos[indice] = presupuestoModificado;

    return presupuestoModificado;
}