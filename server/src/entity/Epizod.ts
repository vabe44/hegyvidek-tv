// tslint:disable-next-line:max-line-length
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
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
    public kiemelt: number;

    @Column()
    public datum: Date;

    @Column()
    public kep: string;
    @Column()
    public video: string;

    @Column()
    public youtube: string;

    @Column()
    public leiras: string;

    @Column()
    public kulcsszavak: string;

    @CreateDateColumn()
    public createdDate: Date;

    @UpdateDateColumn()
    public updatedDate: Date;

    // tslint:disable-next-line:arrow-parens
    @ManyToOne(type => Musor, musor => musor.epizodok, {
        eager: true,
    })
    public musor: Musor;
}
