import { presupuestos } from '../data/datos.js';
import { Presupuesto } from '../models/presupuesto.js';

export function crearPresupuesto(): Presupuesto {
    return new Presupuesto();
}

export function listarPresupuesto(): Presupuesto[] {
    return presupuestos;
}

export function eliminarPresupuesto(id: number): Presupuesto[] | undefined{
    const presupuerto = presupuestos.findIndex(a => a.id === id);

    if (presupuerto !== undefined) {
        return presupuestos.pop()
    }
}