import { ProyectionTable } from "./proyection-table-response";

export interface Producer {
    municipio: string;
    productor: string;
    nPlantas: number;
    fechaSiembra: Date;
    altura: number;
    coeficiente: number;
    exportacion: number;
    expectedProduction?:number;
    proyectionTable?:ProyectionTable[]
    proyectionTableByJson?:any[];
  }