import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { Musor } from "./Musor";

@Entity()
export class Epizod extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public cim: string;

    @Column()
    public url: string;

    @Column()
    public statusz: string;

    @Column()
    public kiemelt: boolean;

    @Column()
    public datum: string;

    @Column()
    public kep: string;
    @Column()
    public video: string;

    @Column()
    public youtube: string;

    @Column()
    public leiras: string;

    // tslint:disable-next-line:arrow-parens
    @ManyToOne(type => Musor, musor => musor.epizodok)
    public musor: Musor;
}
