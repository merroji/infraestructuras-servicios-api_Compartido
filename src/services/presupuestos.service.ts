import { presupuestos, contador } from '../data/datos.js';
import { Presupuesto, DatosParaPresupuesto, CambiosPresupuesto } from '../models/presupuesto.js';

export function crearPresupuesto(datosPresupuesto: DatosParaPresupuesto): Presupuesto {
    
    const nuevoPresupuesto: Presupuesto = {
        id: contador.siguienteIdentificador++,
        cliente: datosPresupuesto.cliente,
        material: datosPresupuesto.material,
        gramos: datosPresupuesto.gramos,
        urgente: datosPresupuesto.urgente,
        importe: 0,
        canal: ""
    }

    presupuestos.push(nuevoPresupuesto);
    
    return nuevoPresupuesto;
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
