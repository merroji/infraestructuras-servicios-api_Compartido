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
        importe: calcularImporte(datosPresupuesto),
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
export function esMaterialValido(material: string): boolean {
    return material.trim().toLowerCase() in PRECIO_POR_GRAMO;
}

// Función reutilizable del cálculo del importe (POST, PUT y PATCH).
// Coste del material -> descuento -> recargo por urgencia -> redondeo.
export function calcularImporte(
    { material, gramos, urgente }: Pick<DatosParaPresupuesto, "material" | "gramos" | "urgente">
): number {
    const precio = PRECIO_POR_GRAMO[material.trim().toLowerCase()] ?? 0;
    let importe = gramos * precio;
    if (gramos >= GRAMOS_PARA_DESCUENTO) {
        importe *= 1 - DESCUENTO;
    }
    if (urgente) {
        importe *= 1 + RECARGO_URGENTE;
    }
    // Redondeo a céntimos para evitar errores.
    return Math.round(importe * 100) / 100;
}

export function actualizarPresupuesto(
    id: number,
    datos: DatosParaPresupuesto
): Presupuesto | undefined {
    const indice = presupuestos.findIndex(p => p.id === id);

    if (indice === -1) {
        return undefined;
    }

    const actual = presupuestos[indice];

    // Se sustituyen todos los campos editables
    // se conservan id y canal,
    // y el importe se recalcula.
    const actualizado: Presupuesto = {
        id: actual.id,
        canal: actual.canal,
        cliente: datos.cliente,
        material: datos.material,
        gramos: datos.gramos,
        urgente: datos.urgente,
        importe: calcularImporte(datos)
    };

    presupuestos[indice] = actualizado;
    return actualizado;
}

export function buscarPresupuesto(id: number): Presupuesto | undefined {
    return presupuestos.find(a => a.id === id);
}
