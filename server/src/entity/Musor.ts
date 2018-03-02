import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";

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
    public megjelenites: string;

    @Column()
    public periodus: string;

    @Column()
    public kep: string;

    @Column()
    public rovidLeiras: string;

    @Column()
    public reszletesLeiras: string;
}
