interface Presupuesto {
    id: number,
    cliente: string,
    material: string,
    gramos: number,
    urgente: boolean,
    importe: number,
    canal: string
}

type DatosParaPresupuesto = Omit<Presupuesto, "id"| "importe" | "canal">;
type CambiosPresupuesto = Partial<DatosParaPresupuesto>;