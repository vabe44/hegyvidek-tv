import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Epizod extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public cim: string;

    @Column()
    public url: string;

    @Column()
    public statusz: boolean;

    @Column()
    public kiemelt: boolean;

    @Column()
    public kulcsszavak: string;

    @Column()
    public datum: string;

    @Column()
    public musor: string;

    @Column()
    public kep: string;

    @Column()
    public youtube: string;

    @Column()
    public reszletesLeiras: string;
}
