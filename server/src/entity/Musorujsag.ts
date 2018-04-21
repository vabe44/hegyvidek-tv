// tslint:disable-next-line:max-line-length
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Musor } from "./Musor";

@Entity()
export class Musorujsag extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id: number;

    // tslint:disable-next-line:arrow-parens
    @ManyToOne(type => Musor, musor => musor.epizodok, {
        eager: true,
    })
    public musor: Musor;

    @Column()
    public nap: number;

    @Column("time")
    public aktivEttol: Date;

    @Column("time")
    public aktivEddig: Date;

    @CreateDateColumn()
    public createdDate: Date;

    @UpdateDateColumn()
    public updatedDate: Date;
}
