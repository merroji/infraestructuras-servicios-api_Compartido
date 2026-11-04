import { presupuestos, contador } from '../data/datos.js';
import { Presupuesto, DatosParaPresupuesto, CambiosPresupuesto } from '../models/presupuesto.js';

// Tarifas (Reglas de negocio).
export const PRECIO_POR_GRAMO: Record<string, number> = {
    pla: 0.12,
    resina: 0.25
};
export const GRAMOS_PARA_DESCUENTO = 500;
export const DESCUENTO = 0.10;       // 10 % si gramos >= 500
export const RECARGO_URGENTE = 0.20; // 20 % si es urgente

export function crearPresupuesto(canal: string, datosPresupuesto: DatosParaPresupuesto): Presupuesto {
    
    const nuevoPresupuesto: Presupuesto = {
        id: contador.siguienteIdentificador++,
        cliente: datosPresupuesto.cliente,
        material: datosPresupuesto.material,
        gramos: datosPresupuesto.gramos,
        urgente: datosPresupuesto.urgente,
        importe: 0,
        canal: canal
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

    const [presupuestoEliminado] = presupuestos.splice(presupuertoIndice, 1)
    return presupuestoEliminado;
}