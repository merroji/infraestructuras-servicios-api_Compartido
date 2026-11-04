import { presupuestos } from "../data/datos.js";
import { DatosParaPresupuesto, Presupuesto } from "../models/presupuesto.js";

// Tarifas (Reglas de negocio).
export const PRECIO_POR_GRAMO: Record<string, number> = {
    pla: 0.12,
    resina: 0.25
};
export const GRAMOS_PARA_DESCUENTO = 500;
export const DESCUENTO = 0.10;       // 10 % si gramos >= 500
export const RECARGO_URGENTE = 0.20; // 20 % si es urgente

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
