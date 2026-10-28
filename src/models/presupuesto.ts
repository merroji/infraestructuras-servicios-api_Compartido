export interface Presupuesto {
    id: number,
    cliente: string,
    material: string,
    gramos: number,
    urgente: boolean,
    importe: number,
    canal: string
}

export type DatosParaPresupuesto = Omit<Presupuesto, "id"| "importe" | "canal">;
export type CambiosPresupuesto = Partial<DatosParaPresupuesto>;