// tslint:disable-next-line:max-line-length
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Gmail extends BaseEntity {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public user: string;

    @Column()
    public pass: string;

    @Column()
    public sendTo: string;
}
