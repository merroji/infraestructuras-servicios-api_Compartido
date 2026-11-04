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

export function listarPresupuesto(material?: string, urgente?: string): Presupuesto[] {
    let resultado = presupuestos;

    if (material !== undefined) {
        resultado = resultado.filter(p => p.material.toLowerCase() === material.toLowerCase());
    }

    if (urgente !== undefined) {
        const esUrgente = urgente === "true";
        resultado = resultado.filter(p => p.urgente === esUrgente);
    }

    return resultado;
}

export function eliminarPresupuesto(id: number): Presupuesto | undefined{
    const presupuertoIndice = presupuestos.findIndex(a => a.id === id);

    if (presupuertoIndice === -1) {
        return undefined
    }

    const presupuestoEliminado = presupuestos[presupuertoIndice]

        for (let i = presupuertoIndice; i < presupuestos.length - 1; i++) {
        presupuestos[i] = presupuestos[i + 1];
    }

    presupuestos.pop();
    return presupuestoEliminado;


}