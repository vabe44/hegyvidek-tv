import { Musor } from './Musor';
export interface Epizod {
    id: number;
    cim: string;
    url: string;
    statusz: string;
    kiemelt: boolean;
    datum: Date;
    kep: string;
    video: string;
    youtube: string;
    leiras: string;
    musor: Musor;
    createdDate: Date;
    updatedDate: Date;
}
