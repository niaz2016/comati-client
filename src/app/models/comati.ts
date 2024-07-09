import { Defaulter } from "./defaulter";
export interface Comati  {
    id: number,
    managerId: number,
    name: string,
    start_Date: Date,
    end_Date?: Date,
    per_Head: number,
    remarks?: string,
    totalMembers: number,
    totalComati: number,
    totalCollected: number,
    defaulters?: Defaulter[],
}