import { Epizod } from './Epizod';

export interface Musor {
    id: number;
    cim: string;
    url: string;
    statusz: string;
    kep: string|any;
    leiras: string;
    createdDate: Date;
    updatedDate: Date;
}
