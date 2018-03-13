import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { Epizod } from "./Epizod";

@Entity()
export class Musor extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public cim: string;

    @Column()
    public url: string;

    @Column()
    public statusz: string;

    @Column()
    public kep: string;

    @Column()
    public leiras: string;

    // tslint:disable-next-line:arrow-parens
    @OneToMany(type => Epizod, epizod => epizod.musor) // note: we will create author property in the Photo class below
    public epizodok: Epizod[];
}
