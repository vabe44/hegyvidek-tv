// tslint:disable-next-line:max-line-length
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Epizod } from "./Epizod";
import { Musorujsag } from "./Musorujsag";

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

    @CreateDateColumn()
    public createdDate: Date;

    @UpdateDateColumn()
    public updatedDate: Date;

    // tslint:disable-next-line:arrow-parens
    @OneToMany(type => Epizod, epizod => epizod.musor) // note: we will create author property in the Photo class below
    public epizodok: Epizod[];

    // tslint:disable-next-line:arrow-parens
    @OneToMany(type => Musorujsag, musorujsag => musorujsag.musor)
    public adasok: Musorujsag[];
}
